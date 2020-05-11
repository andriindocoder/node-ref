const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({headless: true})
	const page = await browser.newPage()

	await page.goto('https://google.com', {waitUntil: 'networkidle2'})

	await page.pdf({
		path: 'newpdf.pdf',
		format: 'Letter',
		margin: {
			top: '1in',
			bottom: '1in',
			left: '1in',
			right: '1in'
		}
	})

	await browser.close()


})()

/*
	page.waitForSelector : waits for the selector to appear in page
	page.evaluate: accepts a func parameter to be evaluated in the page context, always return the function and put on variable so you can access it
	page.focus: accepets a selector and focuses on it
	page.keyboard.type: simulate keypresses and input text
	page.click: accepts selector and clicks on it
	page.waitFor: accepts functions which can prolong wait, if return true, program resumes
*/