const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: true})
	const page = await browser.newPage()
	await page.setViewport({ width: 1280, height: 800 })

	await page.goto('https://github.com/carmalou?tab=repositories', {waitUntil: 'networkidle2'})
	await page.waitForSelector('#user-repositories-list li')

	var tmp = await page.evaluate(() => {
		var repos = document.querySelectorAll('#user-repositories-list li h3 a')
		return Array.from(repos).map((repo) => { return repo.href })
	})

	
	console.log(tmp)

	await browser.close()
})()

/*
	page.waitForSelector : waits for the selector to appear in page
	page.evaluate: accepts a func parameter to be evaluated in the page context
*/