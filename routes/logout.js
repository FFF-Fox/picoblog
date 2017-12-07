var express = require('express');
var router = express.Router();


/* Handle logout of user. */
router.get('/', function(req, res, next) {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect('/');
  });
});

module.exports = router;
