const express = require("express");
const app = express();

app.get("/", (req, res) => {
	res.send("<h3>Hello World</h3>");
});

app.listen(3000, function() {
	console.log("Server started on PORT 3000");
});