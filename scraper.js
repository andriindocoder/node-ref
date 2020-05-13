const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://marketingplatform.google.com/about/partners/find-a-partner');
  // await page.screenshot({path: 'example.png'});
  await page.waitForSelector('div.retail-partner-card h3.title');

  const titles = await page.evaluate(() => 
  	Array.from(document.querySelectorAll('div.retail-partner-card h3.title'))
      .map(partner => partner.innerText.trim()))

  const logos = await page.evaluate(() => 
    Array.from(document.querySelectorAll('div.retail-partner-card .logo img'))
      .map(logo => logo.src))

  console.log(titles);
  console.log(logos);

  await browser.close();
})();