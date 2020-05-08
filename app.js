const express = require('express');
const rp = require('request-promise');
const request = require('request');

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("homepage");
})

app.get("/game/:gameTitle/:gameCreator", (req, res) => {
	const title = req.params.gameTitle;
	const creator = req.params.gameCreator;
	res.render("game", {
		title,
		creator
	});
})

app.get("/list", (req, res) => {
	const games = [
		{title: "Fortnite", creator: "Epic Games"},
		{title: "Dirty Bomb", creator: "Splash Damage"},
		{title: "Battlefield V", creator: "EA Games"},
		{title: "Zelda BOTW", creator: "Nintendo"}
	];

	res.render("list", {
		gameslist: games
	});
})

app.get("*", (req, res) => {
	res.send("That page doesn't exist.");
})


// const url = 'https://api.openweathermap.org/data/2.5/weather?q=Bandung&appid=&units=metric';
const url = 'https://api.unsplash.com/photos?client_id=&order_by=popular&page=1';
// request(url, function(error, response, body) {
// 	if(error){
// 		console.log(error);
// 	}else{
// 		var data = JSON.parse(body);
// 		console.log(data[0].urls.raw);
// 	}
// })

rp(url)
    .then(function (htmlString) {
    	const data = JSON.parse(htmlString);
        console.log(data[0].urls.small);
    })
    .catch(function (err) {
        console.log(err);
    });

app.listen(3000, () => {
	console.log("App is running on port 3000");
})