var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://@localhost/memories";


router.post('/api/v1/memories', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT * FROM memories', function(err, result) {
    done();
    res.json({memories: result.rows});

    if(err) {
      return console.error('error running query', err);
    }
  });
});
});

module.exports = router;
