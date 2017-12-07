const express = require('express');
const router = express.Router();
const user = require('../models/user');
const db = require('../database');
// const mysql = require('mysql');


/*
 * GET login page.
 */
router.get('/', function(req, res, next) {
  // if the user is already logged in redirect to home
  if (req.session.userID) {
    res.redirect('/');
  }

  var User = user();
  let errors = { hasErrors: false };

  res.render('login', {
    title: 'Login',
    session: req.session,
    user: User,
    errors: errors
  });
});


/*
 * POST login page
 */
router.post('/', (req, res, next) => {
  /* Handle form input */
  let User = user(req.body.username, req.body.password);

  /* Validation */
  let errors = User.validateUser();

  /* Return with validation errors if any exist else connect with db and authenticate */
  if (errors.hasErrors) {
    console.log("Validation errors");
    res.render('login', {
      title: 'Teh Login, was not successful!',
      session: req.session,
      user: User,
      errors: errors
    });
  } else {
    db.getUserIdPassword(User.username, (err, result) => {
      if (err) { res.send(500,"Server Error"); return; }
      // If user already exists, authenticate,
      // else show authentication error.
      if (result.length && User.password == result[0].password) {
        console.log("User logged in successfully!");

        // Set session variables
        req.session.userID = result[0].id;
        req.session.userName = User.username;
        if (req.body.checkbox === undefined) {
          const expTime = 1000 * 10;
          req.session.cookie.maxAge = expTime;
        }

        res.redirect('/profile');
      } else {
        // handle error with the error object
        errors.username.push("Username and password don't match.");
        errors.hasErrors = true;

        console.log("User could not log in successfully!");

        res.render('login', {
          title: 'Teh Login, was not successful!',
          session: req.session,
          user: User,
          errors: errors
        });
      }
    });
  }
});

module.exports = router;
