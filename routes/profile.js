var express = require('express');
var router = express.Router();


/* GET profile page. */
router.get('/', function(req, res, next) {
  console.log("Session : " + JSON.stringify(req.session) + " id: " + req.session.id);

  if (!req.session.userID) {
    res.redirect('/login');
  } else {
    console.log();
    res.render('profile', {
      title: "Profile",
      session: req.session
    });
  }
});

module.exports = router;
