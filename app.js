const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rp = require('request-promise');
const cors = require('cors');
const imageToBase64 = require('image-to-base64');
const puppeteer = require('puppeteer');
const request = require('request'); 

app.use(express.static("public"));
app.use(cors());

app.set("view engine", "ejs");

const port = 3001;

app.get('/', (req, res) => {
	res.render('index');
})

app.get('/analyze', (req, res) => {
	const url = 'http://localhost:5555/api/test-node';
	rp(url)
		.then((data) => {
			let today = Math.round((new Date()).getTime() / 1000);

			let result = JSON.parse(data);
			let tanggal = result.map((tanggal) => {
			  return tanggal.date;
			});
			let debit = result.map((debit) => {
			  return debit.debit
			});
			let balance = result.map((balance) => {
			  return balance.balance
			});
			
			res.render('analyze', {
				filename: today,
				balanceData: balance,
				spendingData: debit,
				tanggal: tanggal
			});
			// var randomchar = makeid(7);
			// screenshot('highchart');
		})
		.catch((error) => {
			console.log(error);
		})
})

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

async function screenshot(ssname) {
	console.log(ssname);
	const browser = await puppeteer.launch({headless: true});       // run browser
	const page = await browser.newPage();           // open new tab
	await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });          // go to site

	await page.waitForSelector('#container');          // wait for the selector to load
	const element = await page.$('#container');        // declare a variable with an ElementHandle
	await element.screenshot({path: __dirname + '/public/images/' + ssname + '.png'}); // take screenshot element in puppeteer
	await browser.close();
}

app.get('/response/:filename', (req, res) => {
	var filename = req.params.filename;
	console.log(filename);
	var path = __dirname + '/public/images/' + filename + '.png';
	console.log(path);
	imageToBase64(path) // you can also to use url
	    .then(
	        (response) => {
	        	res.render('image', {
	        		base64: JSON.stringify({
	        			statusCode: 200,
	        			// data: 'data:image/png;base64,' + response
	        			data: 'http://localhost:3001/images/'+ filename + '.png'
	        		})
	        	})
	            // console.log(response); //cGF0aC90by9maWxlLmpwZw==
	        }
	    )
	    .catch(
	        (error) => {
	            console.log(error); //Exepection error....
	        }
	    )
});

app.get('/image', (req, res) => {
	var path = __dirname + '/public/images/highchart.png';
	console.log(path);
	imageToBase64(path) // you can also to use url
	    .then(
	        (response) => {
	        	res.render('image', {
	        		base64: JSON.stringify({
	        			statusCode: 200,
	        			// data: 'data:image/png;base64,' + response
	        			data: 'http://localhost:3001/images/highchart.png'
	        		})
	        	})
	            // console.log(response); //cGF0aC90by9maWxlLmpwZw==
	        }
	    )
	    .catch(
	        (error) => {
	            console.log(error); //Exepection error....
	        }
	    )
});

app.listen(process.env.PORT || port, () => {
	console.log('App is running on port: ' + port);
})