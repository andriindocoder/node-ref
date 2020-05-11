require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5eb8004481334e68e70dc0a4')
	.then((task) => {
		console.log(task)
		return Task.countDocuments({ completed: false })
	})
	.then((result) => {
		console.log(result)
	})
	.catch((error) => {
		console.log(error)
	})