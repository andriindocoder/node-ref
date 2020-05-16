const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Listing = require("./model/Listing");
//craigslistuser:SuperStrongPassword1
const scrapingResults = [
  {
    title: "Entry Level Software Engineer - C or C++",
    datePosted: new Date("2019-07-26 12:00:00"),
    neighborhood: "(palo alto)",
    url:
      "https://sfbay.craigslist.org/pen/sof/d/palo-alto-entry-level-software-engineer/6943135190.html",
    jobDescription:
      "Major Technology company is seeking an Entry Level software Engineer. The ideal candidate will have extensive school project experience with C or C++. Under general supervision...",
    compensation: "Up to US$0.00 per year"
  }
];

async function connectToMongoDb() {
  mongoose.connect('mongodb+srv://root:root@cluster0-ahf6g.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true, useNewUrlParser: true
  }, (error) => {
    if(error){
      console.log(error);
    }else{
      console.log("Database Connected");
    }
  });
}

// const listingSchema = new mongoose.Schema({
//   title: String,
//   datePosted: Date,
//   neighborhood: String,
//   url: String,
//   jobDescription: String,
//   compensation: String
// });

// const Listing = mongoose.model("Listing", listingSchema);

async function scrapeListings(page) {
  await page.goto(
    "https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof"
  );
  const html = await page.content();
  const $ = cheerio.load(html);
  const listings = $(".result-info")
    .map((index, element) => {
      const titleElement = $(element).find(".result-title");
      const timeElement = $(element).find(".result-date");
      const hoodElement = $(element).find(".result-hood");
      const title = $(titleElement).text();
      const neighborhood = $(hoodElement)
        .text()
        .trim()
        .replace("(", "")
        .replace(")", "");
      const url = $(titleElement).attr("href");
      const datePosted = new Date($(timeElement).attr("datetime"));
      return { title, url, datePosted, neighborhood };
    })
    .get();
  return listings;
}

async function scrapeJobDescriptions(listings, page) {
  for (var i = 0; i < listings.length; i++) {
    await page.goto(listings[i].url);
    const html = await page.content();
    const $ = cheerio.load(html);
    const jobDescription = $("#postingbody").text();
    const compensation = $("p.attrgroup > span:nth-child(1) > b").text();
    listings[i].jobDescription = jobDescription;
    listings[i].compensation = compensation;
    console.log(listings[i]);
    // console.log(listings[i].compensation);
    const listingModel = new Listing(listings[i]);
    Listing.create({
      title: listings[i].title,
      datePosted: listings[i].datePosted,
      neighborhood: listings[i].neighborhood,
      url: listings[i].url,
      jobDescription: listings[i].jobDescription,
      compensation: listings[i].compensation
    }, (error, data) => {
      if(error){
        console.log(error, data);
      }else{
        console.log("Data added.");
        console.log(data);
      }
    });
    await sleep(1000); //1 second sleep
  }
}

async function sleep(miliseconds) {
  return new Promise(resolve => setTimeout(resolve, miliseconds));
}

async function main() {
  await connectToMongoDb();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const listings = await scrapeListings(page);
  const listingsWithJobDescriptions = await scrapeJobDescriptions(
    listings,
    page
  );
  // console.log(listings);
}

main();