const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const app = express()

//DB Config
const db = require('./config/keys').MongoURI

// mongoose.connect(db, { useUnifiedTechnology: true}, (error) => {
// 	if(error){
// 		console.log(error);
// 	}else{
// 		console.log("Database Connected");
// 	}
// })

const MongoClient = require('mongodb').MongoClient;
const uri = db;
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

//Body parser
app.use(express.urlencoded({ extended: false }))

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on ${PORT}`))