const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

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

router.patch('/users/me', auth, async (req, res) => {
	const updates = Object.keys(req.body)
	const allowedUpdates = ['name', 'email', 'password', 'age']
	const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

	if(!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Updates'})
	}


	try {
		updates.forEach((updateVariable) => {
			req.user[updateVariable] = req.body[updateVariable]
		})

		await req.user.save()

		res.status(200).send(req.user)

	} catch(error) {
		res.status(400).send(error)
	}
})

router.delete('/users/me', auth, async(req, res) => {
	try {
		await req.user.remove()

		res.send(req.user)

	} catch(error) {
		res.status(400).send(error)
	}
})

const upload = multer({
	// dest: 'avatars',
	limits: {
		fileSize: 1000000
	},
	fileFilter(req, file, cb) {
		if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
			return cb(new Error('Please upload an image.'))
		}
		cb(undefined, true)
	}
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {
	req.user.avatar = req.file.buffer
	//jsbin.com
	await req.user.save()
	res.send(200)
}, (error, req, res, next) => {
	res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async(req, res) => {
	req.user.avatar = undefined
	await req.user.save()
	res.send()
})


module.exports = router