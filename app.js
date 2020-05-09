const express = require('express');
const app = express();
const rp = require('request-promise');
const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0-ahf6g.mongodb.net/test?retryWrites=true&w=majority', {
	useUnifiedTechnology: true
}, (error) => {
	if(error){
		console.log(error);
	}else{
		console.log("Database Connected");
	}
});

var gameSchema = new mongoose.Schema({
	title: String,
	creator: String,
	width: Number,
	height: Number,
	fileName: String,
	thumbnailFile: String
});

var Game = mongoose.model("Game", gameSchema);

Game.create({
	title: "Learn to Fly 2", 
	creator: "light_bringer77",
	width: 640,
	height: 480,
	fileName: "learntofly2.swf",
	thumbnailFile: "Learn_To_Fly_2.jpg"
}, (error, data) => {
	if(error){
		console.log(error, data);
	}else{
		console.log("Data added.");
		console.log(data);
	}
});

Game.find({}, (error, data) => {
	if(error) {
		console.log(error);
	}else{
		console.log(data);
	}
})

const games = [
	{
		title: "Learn to Fly 2", 
		creator: "light_bringer77",
		width: 640,
		height: 480,
		fileName: "learntofly2.swf",
		thumbnailFile: "Learn_To_Fly_2.jpg"
	},
	{
		title: "Run 3", 
		creator: "player_03",
		width: 800,
		height: 600,
		fileName: "run3.swf",
		thumbnailFile: "run3.jpg"
	},
	{
		title: "Continuity", 
		creator: "glimajr",
		width: 640,
		height: 480,
		fileName: "continuity.swf",
		thumbnailFile: "booty.png"
	},
];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

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
	res.render("list", {
		gameslist: games
	});
})

app.get("/addgame", (req, res) => {
	res.render("addgame");
})

app.post("/addgame", (req, res) => {
	var data = req.body;
	games.push(data);
	res.redirect("/list");
})

app.get("*", (req, res) => {
	res.send("That page doesn't exist.");
})

app.listen(3000, () => {
	console.log("App is running on port 3000");
})