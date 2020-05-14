const puppeteer = require('puppeteer');


async function scrapeProduct(url) {
	const browser = await puppeteer.launch();

	const page = await browser.newPage();

	await page.goto(url, {waitUntil: 'networkidle0', timeout: 0});

	const [el] = await page.$x('//*[@id="imgBlkFront"]');
	const src = await el.getProperty('src');
	const srcTxt = await src.jsonValue();

	const [el2] = await page.$x('//*[@id="productTitle"]');
	const txt = await el2.getProperty('innerText');
	const title = await txt.trim().jsonValue();

	const [el3] = await page.$x('//*[@id="buyNewSection"]/h5/div/div[2]/div/span[2]');
	const txt2 = await el3.getProperty('textContent');
	const price = await txt2.jsonValue();

	console.log({srcTxt, title, price})

	browser.close();

}

scrapeProduct('https://www.amazon.com/Nightingale-Novel-Kristin-Hannah/dp/1250080401');