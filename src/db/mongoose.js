const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useUnifiedTopology: true,
	useCreateIndex: true
})

const User = mongoose.model('User', {
	name: {
		type: String
	},
	age: {
		type: Number
	}
})

const me = new User({
	name: 'Andri',
	age: 28
})

me.save().then(() => {
	console.log(me)
})
.catch((error) => {
	console.log(error)
})