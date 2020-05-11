const puppeteer = require('puppeteer');         // include library

(async () => {                                  // declare function
  const browser = await puppeteer.launch();     // run browser
  const page = await browser.newPage();         // create new tab
  await page.goto('https://pocketadmin.tech', {waitUntil: 'networkidle0', timeout: 0});  // go to page
  // declare html markup for header
  html = `<div style="font-size: 15px; padding-top: 8px; text-align: center; width: 100%;">
            <span>This is a PocketAdmin page</span> - <span class="pageNumber"></span>
          </div>
        `;

  await page.emulateMedia('screen');            // use screen media
  await page.pdf({
        path: 'page2.pdf',                       // path to save pdf file  
        displayHeaderFooter: true,              // display header and footer (in this example, required!)
        printBackground: true,                  // print background
        landscape: true,                        // use horizontal page layout
        headerTemplate: html,                   // indicate html template for header
        margin: {                               // increase margins (in this example, required!)
          top: 80,
          bottom: 80,
          left: 30,
          right: 30
          }
        });
  await browser.close();                        // close browser
})();