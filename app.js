const express = require('express');
const app = express();
const rp = require('request-promise');
const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

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

app.use(fileUpload());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("homepage");
})

app.get("/game/:id", (req,res) => {
	var id = req.params.id;

	Game.findById(id, (error, foundGame) => {
		if(error) {
			console.log(error);
		}else{
			res.render("game", {
				title: foundGame.title,
				creator: foundGame.creator,
				width: foundGame.width,
				height: foundGame.height,
				fileName: foundGame.fileName
			});
		}
	})
})

app.get("/game/edit/:id", (req, res) => {
	var id = req.params.id;

	Game.findById(id, (error, foundGame) => {
		if(error) {
			console.log(error);
		}else{
			res.render("editgame", {
				title: foundGame.title,
				creator: foundGame.creator,
				width: foundGame.width,
				height: foundGame.height,
				id: id
			});
		}
	})
})

app.post("/update/:id", (req, res) => {
	var id = req.params.id;

	Game.findByIdAndUpdate(id, {
		title: req.body.title,
		creator: req.body.creator,
		height: req.body.height,
		width: req.body.width
	}, (error, updatedGame) => {
		if(error){
			console.log(error);
		}else{
			res.redirect("/list");
			console.log("Data updated.");
			console.log(updatedGame);
		}
	})
})

app.get("/game/delete/:id", (req, res) => {
	var id = req.params.id;

	Game.findByIdAndDelete(id, (error) => {
		if(error){
			console.log(error);
		}else{
			res.redirect("/list");
		}
	})
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

	var gameFile = req.files.gameFile;
	var imageFile = req.files.imageFile;

	gameFile.mv("public/games/" + gameFile.name, (error) => {
		if(error){
			console.log("Upload games failed");
			console.log(error);
		}else{
			console.log("Game uploaded");
		}
	});

	imageFile.mv("public/images/" + imageFile.name, (error) => {
		if(error){
			console.log("Upload image failed");
			console.log(error);
		}else{
			console.log("Image uploaded");
		}
	});

	Game.create({
		title: data.title, 
		creator: data.creator,
		width: data.width,
		height: data.height,
		fileName: gameFile.name,
		thumbnailFile: imageFile.name
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