const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("<h3>Hello World</h3>");
});

app.get("/contact", (req, res) => {
	res.send("Contact me at: andri@sedania.com");
});

app.get("/about", (req, res) => {
	res.send("Hi I am Andri. I am great.");
});

app.listen(3000, function() {
	console.log("Server started on PORT 3000");
});