const express = require('express');

const app = express();

app.get("/", (req, res) => {
	res.render("homepage.ejs");
})

app.get("/game/:gameTitle/:gameCreator", (req, res) => {
	const title = req.params.gameTitle;
	const creator = req.params.gameCreator;
	res.render("game.ejs", {
		title,
		creator
	});
})

app.get("/gamelist", (req, res) => {
	const games = [
		{title: "Fortnite", creator: "Epic Games"},
		{title: "Dirty Bomb", creator: "Splash Damage"},
		{title: "Battlefield V", creator: "EA Games"},
		{title: "Zelda BOTW", creator: "Nintendo"}
	];


	res.render("gamelist.ejs", {
		gameslist: games
	});
})

app.get("*", (req, res) => {
	res.send("That page doesn't exist.");
})

app.listen(3000, () => {
	console.log("App is running on port 3000");
})