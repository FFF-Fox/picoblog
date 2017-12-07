const express = require('express');
const router = express.Router();
const postFactory = require('../models/post');

const db = require('../database');


/* GET createpost page. */
router.get('/', (req, res, next) => {
  if (req.session.userID !== undefined) {
    res.render('createpost', { title: 'New Post', session: req.session });
  } else {
    res.redirect('/login');
  }
});

router.post('/', (req, res, next) => {
  if (req.session.userID !== undefined) {
    console.log(JSON.stringify(req.body));
    let post = postFactory(req.body.title, req.body.body);
    console.log(post.toString());

    // TODO: validate that the post is ok to be sent from client.
    // TODO: add any additional methods to model post.
    // TODO: handle the post addition to database and redirection of the user.

    db.addNewPost(post.title, post.body, (err, result) => {
      if (err) { res.send(500,"Server Error"); return; }

      res.send('success');
    });
  } else {
    res.send('session timed out');
  }
});

module.exports = router;
