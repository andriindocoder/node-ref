const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({
	dest: 'images',
	limits: {
		fileSize: 1000000
	},
	fileFilter(req, file, cb) {
		// if(!file.originalname.endsWith('.pdf')) {
		if(!file.originalname.match(/\.(doc|docx)$/)) {
			// return cb(new Error('File must be a PDF'))
			return cb(new Error('Please upload doc/docx document.'))
		}
		// cb(new Error('File must be a PDF'))
		cb(undefined, true)
		// cb(undefined, false)
		//regex101.com
	}
})

app.post('/upload', upload.single('upload'), (req, res) => {
	res.send(200)
}, (error, req, res, next) => {
	res.status(400).send({ error: error.message })
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
	console.log('Server is running on port ' + port)
})
