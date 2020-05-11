require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5eb8004481334e68e70dc0a4')
// 	.then((task) => {
// 		console.log(task)
// 		return Task.countDocuments({ completed: false })
// 	})
// 	.then((result) => {
// 		console.log(result)
// 	})
// 	.catch((error) => {
// 		console.log(error)
// 	})

const deleteTaskAndCount = async (id) => {
	const task = await Task.findByIdAndDelete(id)
	const count = await Task.countDocuments({ completed: false })
	return count
}

deleteTaskAndCount('5eb7d8eb42a8e36417b27587').then((count) => {
	console.log(count)
}).catch((e) => {
	console.log(e)
})