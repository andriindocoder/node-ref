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
	Game.find({}, (error, data) => {
		if(error) {
			console.log(error);
		}else{
			console.log(data);
			res.render("list", {
				gameslist: data
			});
		}
	})
})

app.get("/addgame", (req, res) => {
	res.render("addgame");
})

app.post("/addgame", (req, res) => {
	var data = req.body;
	
	Game.create({
		title: data.title, 
		creator: data.creator,
		width: data.width,
		height: data.height,
		fileName: data.fileName,
		thumbnailFile: data.thumbnailFile
	}, (error, data) => {
		if(error){
			console.log(error, data);
		}else{
			console.log("Data added.");
			console.log(data);
		}
	});

	res.redirect("/list");
})

app.get("*", (req, res) => {
	res.send("That page doesn't exist.");
})

app.listen(3000, () => {
	console.log("App is running on port 3000");
})