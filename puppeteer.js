const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: true})
	const page = await browser.newPage()
	await page.setViewport({ width: 1280, height: 800 })
	await page.goto('http://localhost:5555/login', {waitUntil: 'networkidle2'})

	var html = await page.content()
	console.log(html)

	await browser.close()
})()