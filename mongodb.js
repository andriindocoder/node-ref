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

	// db.collection('users').updateOne({
	// 	_id: new ObjectID('5eb7b0034bba9b5b64380204')
	// }, {
	// 	$inc: {
	// 		age: 1
	// 	}
	// 	// $set: {
	// 	// 	name: 'Ossas'
	// 	// }
	// }).then((result) => {
	// 	console.log(result)
	// }).catch((error) => {
	// 	console.log(error)
	// })

	db.collection('tasks').updateMany({
		completed: false
	}, {
		$set: {
			completed: true
		}
	}).then((result) => {
		console.log(result.modifiedCount)
	}).catch((error) => {
		console.log(error)
	})

})