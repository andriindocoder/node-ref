var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var controller = require('./controller');
const http = require('http');
const fs = require('fs');
const path = require('path');

const currentPath = path.join(__dirname, "/public/chart.png");
const newPath = path.join(__dirname, "/public/images/", "chart.png");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hola');
  // fs.rename(currentPath, newPath, function(err) {
  //   if (err) {
  //     throw err
  //   } else {
  //     console.log("Successfully moved the file!")
  //   }
  // })
  try {
    fs.renameSync(currentPath, newPath)
    console.log("Successfully moved the file!")
  } catch(err) {
    throw err
  }
})

const url = 'http://localhost:5555/api/test-node';
app.get('/analyze', (req, res) => {
  http.get(url, (response) => {
    response.on('data', function (data) {
      let parsing = JSON.parse(data);
      const income = parsing.income;
      const expense = parsing.expense;
      res.write('<p>Your income is: Rp ' + income + '</p>');
      res.write('<p>Your expense is : Rp ' + expense + '</p>');
      res.send();
    });
  });
});

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Server started on ' + port);
