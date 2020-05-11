const puppeteer = require('puppeteer');         // include library

async function getBunnies() {
	const browser = await puppeteer.launch({
		args : [
			'--no-sandbox'
		] 
	});

	const page = await browser.newPage();

	const url = 'https://nh.craigslist.org/search/sss?query=bunnies&sort=rel&hasPic=1';

	await page.goto(url);

	await page.waitFor('.result-row');
	const results = await page.$$eval('.result-row', rows => {
		return rows.map(row => {
			const properties = {};
			const titleElement = row.querySelector('.result-title');
			properties.title = titleElement.innerText;
			properties.url = titleElement.getAttribute('href');
			const priceEl = row.querySelector('.result-price');
			properties.price = priceEl ? priceEl.innerText : '';
			const imageEl = row.querySelector('.swipe [data-index="0"] img');
			properties.imageUrl = imageEl ? imageEl.src : '';
			return properties;
		});
	});

	browser.close();
	console.log(results);

	// return {
	// 	url,
	// 	results
	// }
}

getBunnies();
// exports.getBunnies = async function(req, res){
// 	res.status(200).send(await getBunnies());
// }