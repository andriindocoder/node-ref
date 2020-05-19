const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ','')
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

		if(!user) {
			throw new Error()
		}

		req.token = token
		req.user = user
		next()
	} catch(e) {
		res.status(401).send({ error: 'Ga dapet auth.' })
	}
}

module.exports = auth

/*
MongoDB Compass : Sama kayak Robo3T
*/