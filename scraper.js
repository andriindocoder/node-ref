const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://marketingplatform.google.com/about/partners/find-a-partner');
  // await page.screenshot({path: 'example.png'});

  const titles = await page.evaluate(() => 
  	document.querySelector("h2").textContent);

  console.log(titles);

  await browser.close();
})();