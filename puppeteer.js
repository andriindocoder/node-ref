const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: true})
	const page = await browser.newPage()
	await page.setViewport({ width: 1280, height: 800 })
	await page.goto('https://carmalou.com')

	await page.screenshot({
		path: 'fileshot.png',
		fullPage: true
	})

	await browser.close()
})()