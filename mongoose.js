const mongoose = require('mongoose');
const cheerio = require('cheerio');
const request = require('request-promise');

const RedditArticle = mongoose.model("RedditArticle", mongoose.Schema({
	title: String;
}))

async function connectToMongoDb() {
	await mongoose.connect(
		"mongodb://"
	);
	console.log("Database connected");
}

async function scrapeReddit() {
	const html = await request.get("https://reddit.com");
	const $ = cheerio.load(html);
	const titles = $("h2");

	titles.each(async (i, element) => {
		try{
			const title = $(element).text();
			const redditArticle = new RedditArticle({
				title
			});
			await redditArticle.save();
		}catch(e){
			console.log(e);
		}
	})
}

async function main(){
	await connectToMongoDb();
	await scrapeReddit();
}

main();