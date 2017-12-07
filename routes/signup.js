const express = require('express');
const router = express.Router();
const userFactory = require('../models/user');
const db = require('../database');
// const mysql = require('mysql');


/*
 * GET signup page.
 */
router.get('/', function(req, res, next) {
  // if the user is already logged in redirect to home
  if (req.session.userID) {
    res.redirect('/');
  }

  let user = userFactory();
  let errors = { hasErrors: false };

  res.render('signup', {
    title: 'Sign up',
    session: req.session,
    user: user,
    errors: errors
  });
});


/*
 * POST signup page
 */
router.post('/', (req, res, next) => {
  /* get the form input and validate the fields */
  let user = userFactory(req.body.username, req.body.password);
  let errors = user.validateUser();

  console.log("Signup errors: " + JSON.stringify(errors));

  // if the form has errors, send feedback to user,
  // otherwise proceed to check if the user exists in the db.
  if (errors.hasErrors) {
    res.render('signup', {
      title: 'Sign up',
      session: req.session,
      user: user,
      errors: errors
    });
  } else {
    db.getUserId(user.username, (err, results) => {
      if (err) { res.send(500,"Server Error"); return; }

      if (results.length > 0) {
        errors.username.push("Another user has taken this username.");
        errors.hasErrors = true;

        res.render('signup', {
          title: 'Sign up',
          session: req.session,
          user: user,
          errors: errors
        });
      } else {
        db.signUpUser(user.username, user.password, (err, results) => {
          if (err) { res.send(500,"Server Error"); return; }
          res.render('login', {
            title: 'Signed up succesfully! Please Login',
            session: req.session,
            user: user,
            errors: errors
          });
        });
      }
    });
  }
});

module.exports = router;
