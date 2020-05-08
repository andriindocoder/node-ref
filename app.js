var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var controller = require('./controller');
const http = require('http');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
