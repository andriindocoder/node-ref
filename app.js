const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()

//Passport config
require('./config/passport')(passport) 

//DB Config
const db = require('./config/keys').MongoURI

mongoose.connect(db, {
    useUnifiedTopology: true, useNewUrlParser: true
  }, (error) => {
    if(error){
      console.log(error);
    }else{
      console.log("Database Connected");
    }
  })

//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

//Body parser
app.use(express.urlencoded({ extended: false }))

//Express
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global vars
app.use((req, res, next) =>  {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

//Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on ${PORT}`))