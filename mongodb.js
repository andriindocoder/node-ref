// create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
	if(error){
		return console.log(error)
	}

	const db = client.db(databaseName)

	// db.collection('users').insertOne({
	// 	name: 'Andri',
	// 	age: 38
	// }, (error, result) => {
	// 	if(error){
	// 		return console.log(error)
	// 	}

	// 	console.log(result.ops)
	// })

	// db.collection('users').insertMany([
	// {
	// 	name : 'Jen',
	// 	age : 28
	// },
	// {
	// 	name: 'Gunther',
	// 	age: 27
	// }
	// ], (error, result) => {
	// 	if(error) {
	// 		return console.log(error)
	// 	}

	// 	console.log(result.ops)
	// })

	db.collection('tasks').insertMany([
	{
		description : 'Clean the house',
		completed : true
	},
	{
		description : 'Renew Inspection',
		completed : false
	},
	{
		description: 'Pot plants',
		completed: false
	}
	], (error, result) => {
		if(error) {
			return console.log(error)
		}

		console.log(result.ops)
	})
})