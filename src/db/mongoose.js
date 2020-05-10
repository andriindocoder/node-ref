const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useUnifiedTopology: true,
	useCreateIndex: true
})

const User = mongoose.model('User', {
	name: {
		type: String
		required: true,
		trim: true,
	},
	age: {
		type: Number,
		default: 0,
		validate(value) {
			if (value < 0) {
				throw new Error('Age must be positive number')
			}
		} 
	},
	email: {
		type: String,
		trim: true,
		required: true,
		validate(value) {
			if(!validator.isEmail(value)){
				throw new Error('Email is invalid')
			}
		}
	}
})

const me = new User({
	name: 'Bombo',
	age: 18
})

me.save().then(() => {
	console.log(me)
})
.catch((error) => {
	console.log(error)
})

const Task = mongoose.model('Task', {
	description: {
		type: String
	},
	completed: {
		type: Boolean
	}
})

const task = new Task({
	description: 'Learn Mongoose',
	completed: false
})

task.save().then(() => {
	console.log(task)
})
.catch((error) => {
	console.log(error)
})