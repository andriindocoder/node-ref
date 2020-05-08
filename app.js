const express = require('express');

const app = express();

app.get("/", (req, res) => {
	res.render("homepage.ejs");
})

app.get("/game/:gameTitle/:gameCreator", (req, res) => {
	const name = "myName"
	const title = req.params.gameTitle;
	const creator = req.params.gameCreator;
	res.render("game.ejs", {
		title,
		creator,
		name
	});
})

app.get("/game/:gameTitle", (req, res) => {
	const title = req.params.gameTitle;
	res.send("Enjoy " + title);
})

app.get("*", (req, res) => {
	res.send("That page doesn't exist.");
})

app.listen(3000, () => {
	console.log("App is running on port 3000");
})