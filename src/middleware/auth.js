const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authentication').replace('Bearer ','')
		console.log(token)
		const decoded = jwt.verify(token, 'thisissparta')
		const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

		if(!user) {
			throw new Error()
		}

		req.token = token
		req.user = user
		next()
	} catch(e) {
		res.status(401).send({ error: 'Unauthenticated.' })
	}
}

module.exports = auth