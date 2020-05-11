const cron = require('node-cron')

cron.schedule('*/5 * * * * * ', function() {
	console.log('Running task every second')
})