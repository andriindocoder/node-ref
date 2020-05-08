const express = require('express');

const app = express();

app.get("/", (req, res) => {
	res.send("Welcome to my website");
})

app.get("/hello", (req, res) => {
	res.send("Hello and Welcome");
})

app.get("/game", (req, res) => {
	res.send("Game Page");
})

app.listen(3000, () => {
	console.log("App is running on port 3000");
})