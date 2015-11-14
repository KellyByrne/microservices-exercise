var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = process.env.DATABASE_URL || "postgres://@localhost/memoriesapp";
var formatter = require('../lib/formatter.js')

router.post('/api/v1/memories', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
  	client.query('INSERT INTO memories (old_days, these_days, year) VALUES ($1, $2, $3)', [req.body.data.attributes.old_days, req.body.data.attributes.these_days, req.body.data.attributes.year], function(err, result) {
    	done();
    	res.sendStatus(200);
  	});
	});
});


router.get('/api/v1/memories', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
  	client.query('SELECT * FROM memories', function(err, result) {
    	done();
      
    	res.json(formatter.formatter(result.rows));
	 });
  });
});

router.get('/api/v1/memories/years', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
  	client.query('SELECT DISTINCT year FROM memories', function(err, result) {
    	done();
    	var output = [];
    	for(var i=0; i<result.rows.length; i++) {
    		output.push(result.rows[i].year)
    	}
    	res.json({links: {self: "g12-kelly-byrne-memories.cfapps.io/api/v1/memories/years"}, data: output});
  	});
	});
});

router.get('/api/v1/memories/:year', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
  	client.query('SELECT * FROM memories WHERE year=($1)',  [req.params.year], function(err, result) {
    	done();
    	res.json(formatter.formatter(result.rows));
  	});
	});
});





module.exports = router;
