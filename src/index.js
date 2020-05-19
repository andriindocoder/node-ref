const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
	console.log('Server is running on port ' + port)
})

/*
gitignore node_modules and config
$ heroku create mead-task-manager
$ heroku config:set 
$ heroku config:unset key
$ heroku config:set JWT_SECRET=thisisspartaa SENDGRID_API_KEY=blablabla
Mongo Connect short srv
$ heroku config:set MONGODB_URL='mongodb+srv'
$ git push heroku master

*/