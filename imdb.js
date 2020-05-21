const request = require('request-promise');
const cheerio = require('cheerio');

const sampleResult = {
	title: "Bohemian Rapsody",
	rank: 1,
	imdbRating: 8.4,
	descriptionUrl: "https://www.imdb.com/title/tt1727824/",
	posterUrl: "https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg5NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_SY1000_CR0,0,674,1000_AL_.jpg"
}

async function scrapeTitlesRanksAndRatings() {
	const result = await request.get("https://www.imdb.com/chart/top?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=4da9d9a5-d299-43f2-9c53-f0efa18182cd&pf_rd_r=Y2P73GXPCWDKT4RRX0XV&pf_rd_s=right-4&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_ql_3");

	const $ = await cheerio.load(result);

	const movies = $("tr")
		.map((i, element) => {
			const title = $(element).find("td.titleColumn > a").text();
			const descriptionUrl = "https://imdb.com" + $(element).find("td.titleColumn > a").attr("href");
			const imdbRating = $(element).find("td.ratingColumn.imdbRating").text().trim();
			return { title, imdbRating, rank: i, descriptionUrl };
		}).get();

	return movies;
}

async function scrapePosterUrl(movies) {
	const moviesWithPosterUrls = await Promise.all(movies.map(async movie => {
		try {
			const html = await request.get(movie.descriptionUrl);
			const $ = cheerio.load(html);
			movie.posterUrl = "https://imdb.com" + $("div.poster > a").attr("href");
			return movie;
		} catch(e) {
			console.log(e);
		}
	}))
	return moviesWithPosterUrls;
}

async function main() {
	let movies = await scrapeTitlesRanksAndRatings();
	movies = await scrapePosterUrl(movies);
	console.log(movies);
}

main();