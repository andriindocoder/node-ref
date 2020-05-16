const puppeteer = require('puppeteer');         // include library

(async () => {                                  // declare function
  const browser = await puppeteer.launch();     // run browser
  const page = await browser.newPage();         // create new tab
  // await page.goto('https://www.sedaniainnovator.com/', {waitUntil: 'networkidle2', timeout: 0});  // go to page
  // // declare html markup for header
  // html = `<div style="font-size: 15px; padding-top: 8px; text-align: right; width: 100%;">
  //           <span class="pageNumber"></span>
  //         </div>
  //       `;
  // const navigationPromise = page.waitForNavigation()
    
  await page.goto('http://jagatplay.com/2020/05/news/ghost-of-tsushima-lepas-gameplay-baru-berdurasi-18-menit/', {waitUntil: 'networkidle2', timeout: 0})
  // await page.waitForFunction("document.querySelector('img') && document.querySelector('img').clientHeight != 0");
  // or wait until "visibility" not hidden
  // await page.waitForFunction("document.querySelector('img') && document.querySelector('img').style.visibility != 'hidden'");
  // await page.waitForFunction("document.querySelector('#attachment_117651 > img') && document.querySelector('#attachment_117651 > img').innerHTML != ''");
  await page.waitForSelector('#attachment_117651 > img', {visible: true})

  await page.emulateMedia('screen');            // use screen media
  await page.pdf({
        path: 'page1.pdf',                       // path to save pdf file  
        displayHeaderFooter: false,              // display header and footer (in this example, required!)
        printBackground: true,                  // print background
        // landscape: false,                        // use horizontal page layout
        landscape: false,                        // use horizontal page layout
        // headerTemplate: html,                   // indicate html template for header
        margin: {                               // increase margins (in this example, required!)
          top: 80,
          bottom: 80,
          left: 30,
          right: 30
          }
        });
    // await navigationPromise
  await browser.close();                        // close browser
})();