const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

const scrapers = require('./scraper')
const db = require('./db')

app.use(bodyParser.json())
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Content-Type")
	next()
})

app.get('/creators', async(req, res) => {
	const creators = await db.getAllCreators();
	console.log('Pak turis', creators)
	res.send(creators)
})

app.post('/creators', async(req, res) => {
	console.log(req.body)
	const channelData = await scrapers.scrapeChannel(req.body.channelURL)
	const creators = await db.insertCreator(channelData.name, channelData.avatarURL, req.body.channelURL)
	res.send(creators)
})

app.listen(port, () => console.log('App is listening on port ' + port))