const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const app = express()

//DB Config
const db = require('./config/keys').MongoURI

// mongoose.connect(db, { useNewUrlParser: true})
// 	.then(() => console.log("DB Connected"))
// 	.catch(e => console.log(e))

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