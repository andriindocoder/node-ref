const puppeteer = require('puppeteer');

(async () => {

  //Extract partners on the page, recursively check the next page in the URL
  const extractPartners = async (url) => {
    const page = await browser.newPage();
    await page.goto(url);
    console.log(`scraping: ${url}`)
    await page.waitForSelector('div.retail-partner-card h3.title');

    //Scrape the data we want
    const partnersOnPage = await page.evaluate(() => 
      Array.from(document.querySelectorAll('div.retail-partner-card'))
        .map(compact => ({
          title: compact.querySelector('h3.title').textContent.trim(),
          logo: compact.querySelector('.logo img').src
        })))

    await page.close();
    //Should we end recursion? Recursively scrape the next page
    if(partnersOnPage.length < 1) {
      console.log(`terminate recursion on: ${url}`)
      return partnersOnPage;
    } else {
      // Go fetch the next page

        //What is the next URL?
        const nextPageNumber = parseInt(url.match(/page=(\d+)$/)[1], 10) + 1;

        const nextUrl = `https://marketingplatform.google.com/about/partners/find-a-partner?page=${nextPageNumber}`;
      return partnersOnPage.concat(await extractPartners(nextUrl))
    }
  }
  const browser = await puppeteer.launch();  

  const firstUrl = 'https://marketingplatform.google.com/about/partners/find-a-partner?page=40';

  const partners = await extractPartners(firstUrl);

  console.log(partners);

  await browser.close();
})();