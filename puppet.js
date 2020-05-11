/* main.js */
const express = require("express");
const app = express();

const puppeteer = require('puppeteer');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'daairnmgx', 
  api_key: '197919379158982', 
  api_secret: 'QUKtW45zMmAkwdcqs-7xguenxLo'
});

// Create an express route
app.post("/upload", (req, res) => {
  console.log('dijalankan')
  takeScreenshot()
    .then((screenshot) => uploadScreenshot(screenshot))
    .then((result) => res.status(200).json(result));
});

const embedUrl = 'https://google.com';

// See https://bitsofco.de/using-a-headless-browser-to-capture-page-screenshots
async function takeScreenshot() {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 800,
      height: 800,
      isLandscape: true
    }
  });

  console.log('puppeteer jalan');

  const page = await browser.newPage();

  await page.goto(
    embedUrl,
    { waitUntil: 'networkidle2' }
  );

  const screenshot = await page.screenshot({
    encoding: 'binary'
  });

  await browser.close();

  return screenshot;
}

function uploadScreenshot(screenshot) {
  return new Promise((resolve, reject) => {
    const uploadOptions = {};
    cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
      if (error) reject(error)
      else resolve(result);
    }).end(screenshot);
  });
}

app.listen(3000, () => {
  console.log('App is running on port 3000')
})