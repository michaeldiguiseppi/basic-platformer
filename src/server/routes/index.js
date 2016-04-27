var express = require('express');
var router = express.Router();
var query = require('../db/high_score_queries');

router.get('/scores', function(req, res, next) {
  query.getHighScores().then(function(data){
    res.json(data);
  });
});

router.post('/score', function(req, res, next){
  query.addScore(req.body).then(function(data){
    res.json(data);
  });
});

module.exports = router;
