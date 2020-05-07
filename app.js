const express = require('express');
const https = require('https');

const app = express();
const url =
  'https://api.openweathermap.org/data/2.5/weather?q=Bandung&appid=3cbfea738d409eb1692515dd7947cf7b&units=metric';

app.get('/', (req, res) => {
  https.get(url, (response) => {
    response.on('data', function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.feels_like;
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);
    });
  });

  res.send('Server is up and running');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
