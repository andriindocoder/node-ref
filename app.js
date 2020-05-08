const express = require('express');

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

app.get("/gamelist", (req, res) => {
	const games = [
		{title: "Fortnite", creator: "Epic Games"},
		{title: "Dirty Bomb", creator: "Splash Damage"},
		{title: "Battlefield V", creator: "EA Games"},
		{title: "Zelda BOTW", creator: "Nintendo"}
	];


	res.render("gamelist", {
		gameslist: games
	});
})

app.get("*", (req, res) => {
	res.send("That page doesn't exist.");
})

app.listen(3000, () => {
	console.log("App is running on port 3000");
})