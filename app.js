const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const query = req.body.cityName;
  const apiKey = '3cbfea738d409eb1692515dd7947cf7b';
  const units = 'metric';
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    query +
    '&appid=' +
    apiKey +
    '&units=' +
    units;

  https.get(url, (response) => {
    response.on('data', function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.feels_like;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';
      res.write('<p>The weather is currently: ' + weatherDescription + '</p>');
      res.write(
        '<h3>The temperature in ' +
          query +
          ' is : ' +
          temp +
          ' degrees Celcius.</h3>'
      );
      res.write('<img src=' + imageURL + '>');
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
