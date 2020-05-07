const express = require('express');
const https = require('https');

const app = express();
const url =
  'http://api.openweathermap.org/data/2.5/weather?q=Paris&appid=3cbfea738d409eb1692515dd7947cf7b';

app.get('/', (req, res) => {
  https.get(url, (response) => {
    console.log(response);
  });

  res.send('Server is up and running');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000.');
});
