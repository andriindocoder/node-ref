const puppeteer = require('puppeteer');         // include library

(async () => {                                  // declare function
  const browser = await puppeteer.launch({ignoreHTTPSErrors: true});     // run browser
  
  const page = await browser.newPage();         // create new tab
  await page.setDefaultNavigationTimeout(60000);
  // await page.goto('https://www.sedaniainnovator.com/', {waitUntil: 'networkidle2', timeout: 0});  // go to page
  // // declare html markup for header
  // html = `<div style="font-size: 15px; padding-top: 8px; text-align: right; width: 100%;">
  //           <span class="pageNumber"></span>
  //         </div>
  //       `;
  // const navigationPromise = page.waitForNavigation()
    
  await page.goto('https://www.nytimes.com/2020/05/15/briefing/11-of-our-best-weekend-reads.html?action=click&module=Top%20Stories&pgtype=Homepage', {waitUntil: 'networkidle2', timeout: 0})
  // await page.waitForFunction("document.querySelector('img') && document.querySelector('img').clientHeight != 0");
  // or wait until "visibility" not hidden
  // await page.waitForFunction("document.querySelector('img') && document.querySelector('img').style.visibility != 'hidden'");
  // await page.waitForFunction("document.querySelector('#attachment_117651 > img') && document.querySelector('#attachment_117651 > img').innerHTML != ''");

  // await page.waitForSelector('.css-1m50asq')

  // await page.evaluate(async () => {
  //   const selectors = Array.from(document.querySelectorAll("img"));
  //   await Promise.all(selectors.map(img => {
  //     if (img.complete) return;
  //     return new Promise((resolve, reject) => {
  //       img.addEventListener('load', resolve);
  //       img.addEventListener('error', reject);
  //     });
  //   }));
  // })

  await page.emulateMedia('screen');            // use screen media
  await page.pdf({
        path: 'nytimes.pdf',                       // path to save pdf file  
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
  setTimeout(async function() {
          await page.pdf({
                path: 'nytimes2.pdf',                       // path to save pdf file  
                displayHeaderFooter: false,              // display header and footer (in this example, required!)
                printBackground: true,                  // print background
                // landscape: false,                        // use horizontal page layout
                landscape: true,                        // use horizontal page layout
                // headerTemplate: html,                   // indicate html template for header
                margin: {                               // increase margins (in this example, required!)
                  top: 40,
                  bottom: 40,
                  left: 15,
                  right: 15
                  }
                });
        await browser.close();                        // close browser
      }, 5000);
  
    // await navigationPromise
})();