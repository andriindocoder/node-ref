var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.getConnection(function(err, conn) {
  	if(err) throw err;
  	conn.query("SELECT * FROM artikel", function(err, rows){
  		if(err) throw err;
	    res.render('index', { data: rows, title: 'Express' });
  	});
  });
});

module.exports = router;
