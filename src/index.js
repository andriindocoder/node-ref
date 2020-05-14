const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
	console.log('Server is running on port ' + port)
})

const bcrypt = require('bcryptjs')

const myFunction = async () => {
	const password = 'Red123'
	const hashedPassword = await bcrypt.hash(password, 8)

	const isMatch = await bcrypt.compare('Red123', hashedPassword)
}

myFunction()