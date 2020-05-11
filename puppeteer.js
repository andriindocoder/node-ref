const puppeteer = require('puppeteer');           // include lib
(async () => {                                    // declare function
  const browser = await puppeteer.launch();       // run browser
  const page = await browser.newPage();           // open new tab
  await page.goto('https://google.com');          // go to site

  // Далее #hplogo - требуемый нам селектор
  await page.waitForSelector('#hplogo');          // wait for the selector to load
  const element = await page.$('#hplogo');        // declare a variable with an ElementHandle
  await element.screenshot({path: 'google.png'}); // take screenshot element in puppeteer
  await browser.close();                          // close browser
})();