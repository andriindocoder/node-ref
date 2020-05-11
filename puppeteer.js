const puppeteer = require('puppeteer');
(async () => {                                      // declare function
  const browser = await puppeteer.launch();         // run browser
  const page = await browser.newPage();             // open new tab
  await page.goto('https://google.com');            // go to site

  // #hplogo - selector
  await page.waitForSelector('#hplogo');             // wait for the selector to load
  const logo = await page.$('#hplogo');              // declare a variable with an ElementHandle
  const box = await logo.boundingBox();              // this method returns an array of geometric parameters of the element in pixels.
  const x = box['x'];                                // coordinate x
  const y = box['y'];                                // coordinate y
  const w = box['width'];                            // area width
  const h = box['height'];                           // area height
  await page.screenshot({'path': 'logo.png', 'clip': {'x': x, 'y': y, 'width': w, 'height': h}});     // take screenshot of the required area in puppeteer
  await browser.close();                             // close browser
})();