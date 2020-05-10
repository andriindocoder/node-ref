const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
	name: {
		type: String,
		required: true,
		trim: true
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
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		validate(value) {
			if(value.toLowerCase().includes('password')){
				throw new Error('Password can not contain "password"')
			}
		}
	}
})

module.exports = User