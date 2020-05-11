const puppeteer = require('puppeteer');         // include library

(async () => {                                  // declare function
  const browser = await puppeteer.launch();     // run browser
  const page = await browser.newPage();         // create new tab
  await page.goto('https://google.com');  // go to page
  await page.emulateMedia('screen');            // use screen media
  await page.pdf({path: 'page.pdf', displayHeaderFooter: true, printBackground: true});  // generate pdf
  await browser.close();                        // close browser
})();