const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

async function main(){
	try{
		const browser = await puppeteer.lauch({headless: false});
		const page = await browser.newPage();
		page.goto("https://accounts.craigslist.org/login");
		await page.type("input#inputEmailHandle", "stef@gmail.com");
		await page.type("input#inputPassword", "1sxa42sdf");
		await page.click("button#login", {delay: 0});
		await page.waitForNavigation()
		await page.goto("https://accounts.craigslist.org/login?rt=L&wre=billing")
		const content = await page.content();
		const $ = await cheerio.load(content);
		const theText = $("body > article > fieldset > b").text();
		console.log(theText)
	}catch(e){
		console.log(e)
	}
}

main()