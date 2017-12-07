var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.views) { req.session.views = 0; }
  req.session.views += 1;

  console.log("Session : " + JSON.stringify(req.session) + " id: " + req.session.id);
  res.render('index', { title: 'Picoblog', session: req.session });
});

module.exports = router;
