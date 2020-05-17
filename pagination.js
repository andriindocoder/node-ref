const request = require('request-promise');
const cheerio = require('cheerio');

async function scrape() {
	for(let index=0; index<= 360; index + 120){
		const html = await request.get("https://sfbay.craigslist.org/search/vol?s=" + index)
		const $ = await cheerio.load(html);

		$(".result-title").each((index, element) => {
			console.log($(element).text())
		})
		console.log("Page " + index)
	}
	
}

scrape();