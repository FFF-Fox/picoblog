const express = require('express');
const router = express.Router();

const db = require('../database');


/* GET blog page. */
router.get('/', (req, res, next) => {
  db.getBlogPosts( (err, results) => {
    if (err) { res.send(500, "Server Error"); return; }

    res.render('blog', { title: 'Blog', session: req.session, posts: results });
  });
});

module.exports = router;
