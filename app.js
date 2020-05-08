const express = require('express');
const rp = require('request-promise');
const request = require('request');

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("homepage");
})

app.get("/game/:title/:creator/:width/:height/:fileName", (req,res) => {
	res.render("game", {
		title: req.params.title,
		creator: req.params.creator,
		width: req.params.width,
		height: req.params.height,
		fileName: req.params.fileName
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

app.listen(3000, () => {
	console.log("App is running on port 3000");
})