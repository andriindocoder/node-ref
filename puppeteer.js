const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://en.wikipedia.org/wiki/Coronavirus');
  await page.screenshot({path: 'wiki.png'});
  // await browser.waitForTarget(() => false)

  // Get the "viewport" of the page, as reported by the page.
    const result = await page.evaluate(() => {
      let headingWiki = document.querySelectorAll(".mw-headline");
      const headingList = [...headingWiki];
      return headingList.map(h => h.innerText);
    });

    console.log(result);


  await browser.close();
})();