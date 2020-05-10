// create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
	if(error){
		return console.log(error)
	}

	const db = client.db(databaseName)

	// db.collection('users').findOne({ _id: new ObjectID('5eb7b1d86fb2365bef23b570') }, (error, user) => {
	// 	if(error){
	// 		return console.log(error)
	// 	}

	// 	console.log(user)
	// })

	// db.collection('users').find({ age: 27 }).toArray((error, users) => {
	// 	if(error){
	// 		return console.log(error)
	// 	}
	// 	console.log(users)
	// })

	// db.collection('users').find({ age: 27 }).count((error, count) => {
	// 	if(error){
	// 		return console.log(error)
	// 	}
	// 	console.log(count)
	// })

	db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
		if(error){
			return console.log(error)
		}
		console.log(tasks)
	})
})