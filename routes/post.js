const express = require('express');
const router = express.Router();

const db = require('../database');


/* GET /post/:id page. */
router.get('/:postId', (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId);
  db.getBlogPostById( postId, (err, results) => {
    if (err) { res.send(500, "Server Error"); return; }

    console.log(JSON.stringify(results));

    if (results.length > 0) {
      res.render('post', {
        title: 'Blog',
        session: req.session,
        posts: results });
    } else {
      // let 404 be handled.
      res.status(404).send('Error 404: There is no such post!');
    }
  });
});

/*
 * GET /post page. Simply redirect to /blog.
 */
router.get('/', (req, res, next) => {
  res.redirect('/blog');
});

module.exports = router;
