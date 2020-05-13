const puppeteer = require('puppeteer');

(async () => {
  const extractPartners = async (url) => {
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector('div.retail-partner-card h3.title');
    const partners = await page.evaluate(() => 
      Array.from(document.querySelectorAll('div.retail-partner-card'))
        .map(compact => ({
          title: compact.querySelector('h3.title').textContent.trim(),
          logo: compact.querySelector('.logo img').src
        })))
    return partners
  }
  const browser = await puppeteer.launch();  

  const url = 'https://marketingplatform.google.com/about/partners/find-a-partner';

  const partners = await extractPartners(url);

  console.log(partners);

  await browser.close();
})();