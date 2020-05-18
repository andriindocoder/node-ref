const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id
	})

	try {
		await task.save()
		res.status(201).send(task)
	} catch (e){
		res.status(400).send(e)
	}
})

//GET /tasks?completed=true
//limit skip
//GET /tasks?limit=10&skip=20
router.get('/tasks', auth, async (req, res) => {
	const match = {}

	if(req.query.completed){
		match.completed = req.query.completed === 'true'
	}

	try {
		// const tasks = await Task.find({ owner: req.user._id })
		await req.user.populate({
			path: 'tasks_user',
			match,
			options: {
				limit: parseInt(req.query.limit),
				skip: parseInt(req.query.skip)
			}
		}).execPopulate()
		res.status(200).send(req.user.tasks_user)
	} catch (error){
		res.status(500).send(error)
	}
})

router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id

	try {
		const task = await Task.findOne({ _id, owner: req.user._id })

		if(!task){
			return res.status(404).send()
		}

		res.status(200).send(task)
	} catch(error) {
		res.status(500).send(error)
	}
})

router.patch('/tasks/:id', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['description', 'completed']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if(!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Updates'})
	}

	const _id = req.params.id

	try {
		const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

		if(!task){
			return res.status(404).send()
		}

		updates.forEach((updateVariable) => {
			task[updateVariable] = req.body[updateVariable]
		})

		await task.save()

		res.status(200).send(task)

	} catch(error) {
		res.status(400).send(error)
	}
})

router.delete('/tasks/:id', auth, async(req, res) => {
	const _id = req.params.id

	try {
		const task = await Task.findOneAndDelete({_id, owner: req.user._id})

		if(!task){
			return res.status(404).send()
		}

		res.status(200).send(task)

	} catch(error) {
		res.status(400).send(error)
	}
})

module.exports = router