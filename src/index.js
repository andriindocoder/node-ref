const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
	console.log('Server is running on port ' + port)
})

const Task = require('./models/task')
const User = require('./models/User')

const main = async() => {
	// const task = await Task.findById('5ec13a0f28f6de1546fa1ad7')
	// await task.populate('owner').execPopulate()
	// console.log(task.owner)

	const user = await User.findById('5ec137e1938d06147191ee1b')
	await user.populate('tasks_user').execPopulate()
	console.log(user.tasks_user)
}

main()