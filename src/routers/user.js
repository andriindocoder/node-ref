const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/users/profile',auth, async (req, res) => {
	res.send(req.user)
})

router.post('/users/login', async(req, res) => {
	try {
		const user = await User.findByCredentials(req.body.email, req.body.password)
		const token = await user.generateAuthToken()
		res.send({user, token})
	} catch(e) {
		res.status(400).send()
	}
})

router.post('/users/logout', auth, async(req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token != req.token
		})
		await req.user.save()

		res.send()
	} catch(e) {
		res.status(500).send()
	}
})

router.post('/users/logoutAll', auth, async(req, res) => {
	try {
		req.user.tokens = []
		await req.user.save()
		res.send()
	} catch (e) {
		res.status(500).send()
	}
})

router.get('/users', auth, async (req, res) => {
	try {
		const users = await User.find({})
		res.status(200).send(users)
	} catch(error){
		res.status(500).send(error)
	}
})

router.get('/users/:id', async (req, res) => {
	const _id = req.params.id

	try {
		const user = await User.findById(_id)
		if(!user){
			return res.status(404).send()
		}
		res.status(200).send(user)
	} catch(error) {
		res.status(500).send(error)
	}
})

router.patch('/users/:id', async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if(!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Updates'})
	}


	try {
		const user = await User.findById(req.params.id)

		updats.forEach((updateVariable) => {
			user[updateVariable] = req.body[updateVariable]
		})

		await user.save()

		// const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		// 	new: true,
		// 	runValidators: true
		// })

		if(!user){
			return res.status(404).send()
		}

		res.status(200).send(user)

	} catch(error) {
		res.status(400).send(error)
	}
})

router.delete('/users/:id', async(req, res) => {
	const _id = req.params.id

	try {
		const user = await User.findByIdAndDelete(_id, req.body)

		if(!user){
			return res.status(404).send()
		}

		res.status(200).send(user)

	} catch(error) {
		res.status(400).send(error)
	}
})

module.exports = router