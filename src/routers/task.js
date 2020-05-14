const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

router.post('/tasks', async (req, res) => {
	const task = new Task(req.body)

	try {
		await task.save()
		res.status(201).send(task)
	} catch (e){
		res.status(400).send(e)
	}
})

router.get('/tasks', async (req, res) => {
	try {
		const tasks = await Task.find({})
		res.status(200).send(tasks)
	} catch (error){
		res.status(500).send(error)
	}
})

router.get('/tasks/:id', async (req, res) => {
	const _id = req.params.id

	try {
		const task = await Task.findById(_id)
		if(!task){
			return res.status(404).send()
		}
		res.status(200).send(task)
	} catch(error) {
		res.status(500).send(error)
	}
})

router.patch('/tasks/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['description', 'completed']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if(!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Updates'})
	}

	const _id = req.params.id

	try {
		const task = await Task.findById(req.params.id)

		updats.forEach((updateVariable) => {
			task[updateVariable] = req.body[updateVariable]
		})

		await task.save()

		// const task = await Task.findByIdAndUpdate(_id, req.body, {
		// 	new: true,
		// 	runValidators: true
		// })

		if(!task){
			return res.status(404).send()
		}

		res.status(200).send(task)

	} catch(error) {
		res.status(400).send(error)
	}
})

router.delete('/tasks/:id', async(req, res) => {
	const _id = req.params.id

	try {
		const task = await Task.findByIdAndDelete(_id, req.body)

		if(!task){
			return res.status(404).send()
		}

		res.status(200).send(task)

	} catch(error) {
		res.status(400).send(error)
	}
})

module.exports = router