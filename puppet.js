/* main.js */
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.static("public"));
app.set("view engine", "ejs");

const puppeteer = require('puppeteer');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'daairnmgx', 
  api_key: '197919379158982', 
  api_secret: 'QUKtW45zMmAkwdcqs-7xguenxLo'
});

app.post("/json-puppeteer", (req, res) => {
  var data = req.body;

  let filename = Math.round((new Date()).getTime() / 1000);

  let result = data;
  let tanggal = result.map((tanggal) => {
    return tanggal.date;
  });
  let debit = result.map((debit) => {
    return debit.debit
  });
  let balance = result.map((balance) => {
    return balance.balance
  });

  createPdf(filename, tanggal, debit, balance)
    .then((screenshot) => uploadScreenshot(screenshot))
    .then((result) => res.status(200).json(result));

  // res.send('analyze', {
  //   filename: today,
  //   balanceData: balance,
  //   spendingData: debit,
  //   tanggal: tanggal
  // });

  // takeScreenshot('https://google.com/')
  //   .then((screenshot) => uploadScreenshot(screenshot))
  //   .then((result) => res.status(200).json(result));
})

// Create an express route
app.post("/upload", (req, res) => {
  takeScreenshot('https://google.com/')
    .then((screenshot) => uploadScreenshot(screenshot))
    .then((result) => res.status(200).json(result));
});

app.post("/pdf", (req, res) => {
  createPdf()
    .then((screenshot) => uploadScreenshot(screenshot))
    .then((result) => res.status(200).json(result));
});

async function createPdf(filename, tanggal, debit, balance) {
  const xaxis = JSON.stringify(tanggal);
  const spending = JSON.stringify(debit);
  const balances = JSON.stringify(balance);
  const fname = 'hc'+ filename +'.png';
  const html = `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Highchart Test</title>
    <style>
      .hidden {
        display: none;
      }
      * { margin:0; padding:0; box-sizing:border-box; }
    </style>
  </head>
  <body>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

    <figure>
      <div id="container"></div>
    </figure>

    <script>
      'use strict';

      // Load the fonts
      Highcharts.createElement('link', {
          href: 'https://fonts.googleapis.com/css?family=Signika:400,700',
          rel: 'stylesheet',
          type: 'text/css'
      }, null, document.getElementsByTagName('head')[0]);
      // Add the background image to the container
      Highcharts.addEvent(Highcharts.Chart, 'afterGetContainer', function () {
          // eslint-disable-next-line no-invalid-this
          this.container.style.background =
              'url(https://www.highcharts.com/samples/graphics/sand.png)';
      });
      Highcharts.theme = {
          colors: ['#f45b5b', '#8085e9', '#8d4654', '#7798BF', '#aaeeee',
              '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
          chart: {
              backgroundColor: null,
              style: {
                  fontFamily: 'Signika, serif'
              }
          },
          title: {
              style: {
                  color: 'black',
                  fontSize: '16px',
                  fontWeight: 'bold'
              }
          },
          subtitle: {
              style: {
                  color: 'black'
              }
          },
          tooltip: {
              borderWidth: 0
          },
          labels: {
              style: {
                  color: '#6e6e70'
              }
          },
          legend: {
              backgroundColor: '#E0E0E8',
              itemStyle: {
                  fontWeight: 'bold',
                  fontSize: '13px'
              }
          },
          xAxis: {
              labels: {
                  style: {
                      color: '#6e6e70'
                  }
              }
          },
          yAxis: {
              labels: {
                  style: {
                      color: '#6e6e70'
                  }
              },
              gridLineWidth: 0
          },
          plotOptions: {
              series: {
                  shadow: true
              },
              candlestick: {
                  lineColor: '#404048'
              },
              map: {
                  shadow: false
              }
          },
          // Highstock specific
          navigator: {
              xAxis: {
                  gridLineColor: '#D0D0D8'
              }
          },
          rangeSelector: {
              buttonTheme: {
                  fill: 'white',
                  stroke: '#C0C0C8',
                  'stroke-width': 1,
                  states: {
                      select: {
                          fill: '#D0D0D8'
                      }
                  }
              }
          },
          scrollbar: {
              trackBorderColor: '#C0C0C8'
          }
      };
      // Apply the theme
      Highcharts.setOptions(Highcharts.theme);
    </script>
    <script>
      var xaxis = ${xaxis};
      var balance = ${balances};
      var spending = ${spending};

      Highcharts.chart('container', {
          chart: {    
            type: 'line'
                  // events: {
                  //     load: function () {
                  //         var ch = this;
                  //         setTimeout(function () {
                  //             if (ch.options) {
                  //                 ch.exportChart();
                  //             }
                  //         }, 1);
                  //     }
                  // }
              },
          title: {
              text: 'Spending vs Balance Pattern'
          },
          xAxis: {
              categories: xaxis
          },
          yAxis: {
              title: {
                  text: 'Amount (RM)'
              }
          },
          plotOptions: {
              line: {
                  dataLabels: {
                      enabled: true
                  },
                  enableMouseTracking: false
              }
          },
          exporting: {
                  enabled: false
              },
          series: [{
              name: 'Balance',
              data: balance
          }, {
              name: 'Spending',
              data: spending
          }]
      });
    </script>

    <script>

    </script>
  </body>
  </html>
  
  `;
  const browser = await puppeteer.launch({});

  const page = await browser.newPage();

  await page.setViewport({
       width: 640,
       height: 400,
     });

  await page.setContent(html, {waitUntil: 'networkidle0', timeout: 0});

  const screenshot = await page.screenshot({
    encoding: 'binary',
    omitBackground: true,
    path: __dirname + '/public/images/' + fname
  });

  await browser.close();

  const result = {
    skrinsut: screenshot, 
    path: 'http://localhost:3001/images/' + fname
  };
  return result;

  // return screenshot;
}

// See https://bitsofco.de/using-a-headless-browser-to-capture-page-screenshots
async function takeScreenshot(embedUrl) {
  const browser = await puppeteer.launch({

  });

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

// function uploadScreenshot(screenshot) {
//   return new Promise((resolve, reject) => {
//     const uploadOptions = {};
//     cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
//       if (error) reject(error)
//       else resolve(result);
//     }).end(screenshot);
//   });
// }

function uploadScreenshot(screenshot) {
  return new Promise((resolve, reject) => {
    resolve(
      {
        statusCode: 200,
        url: screenshot.path
      }
    )
  });
}

app.listen(3000, () => {
  console.log('App is running on port 3000')
})