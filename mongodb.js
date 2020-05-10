// create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())
console.log(id.id.length)
console.log(id.toHexString().length)


MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
	if(error){
		return console.log(error)
	}

	const db = client.db(databaseName)

	// db.collection('users').insertOne({
	// 	name: 'Vikram',
	// 	age: 26
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

	// db.collection('tasks').insertMany([
	// {
	// 	description : 'Clean the house',
	// 	completed : true
	// },
	// {
	// 	description : 'Renew Inspection',
	// 	completed : false
	// },
	// {
	// 	description: 'Pot plants',
	// 	completed: false
	// }
	// ], (error, result) => {
	// 	if(error) {
	// 		return console.log(error)
	// 	}

	// 	console.log(result.ops)
	// })
})