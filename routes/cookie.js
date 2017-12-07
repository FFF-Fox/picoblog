const express = require('express');
const router = express.Router();


var session;

/* GET cookie page. */
router.get('/', function(req, res, next) {
  if (req.session.uniqueID) {
    req.session.uniqueID = undefined;
    // req.session.destroy();
  } else {
    req.session.uniqueID = 420;
  }
  session = req.session;

  console.log("myFirstCookie : " + req.cookies.myFirstCookie);
  if (!req.cookies.myFirstCookie) {
    res.cookie('myFirstCookie', 'looksGood');
    console.log("Cookie set!");
  } else {
    res.clearCookie('myFirstCookie');
    console.log("Cookie cleared!");
  }

  console.log('Session : '+ JSON.stringify(session) + " id: "+session.id);
  res.render('cookie', { title: 'Cookie tests and more...', session: req.session });
});

module.exports = router;
