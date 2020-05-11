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


	function waitforbalance() {
		return document.getElementById('current-balance').innerHTML != '';
	}

	function waitforinterest() {
		return document.getElementById('unpaid-interest').innerHTML != '';
	}
	
	var currentBalance = await page.evaluate(() => {
		return document.getElementById('current-balance').innerHTML;
	})

	var unpaidInterest = await page.evaluate(() => {
		return document.getElementById('unpaid-interest').innerHTML;
	})

	await browser.close()


})()

/*
	page.waitForSelector : waits for the selector to appear in page
	page.evaluate: accepts a func parameter to be evaluated in the page context
	page.focus: accepets a selector and focuses on it
	page.keyboard.type: simulate keypresses and input text
	page.click: accepts selector and clicks on it
	page.waitFor: accepts functions which can prolong wait, if return true, program resumes
*/