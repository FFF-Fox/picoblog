/* modules */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sessions = require('express-session');

/* routers */
const index = require('./routes/index');
const blog = require('./routes/blog');
const login = require('./routes/login');
const signup = require('./routes/signup');
const cookie = require('./routes/cookie');
const logout = require('./routes/logout');
const profile = require('./routes/profile');
const createpost = require('./routes/createpost');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({
  secret: 'awdijawhdiawdiuwad',
  resave: false,
  saveUninitialized: true
  // cookie: { maxAge: 1000 * 10 }
}));

app.use('/', index);
app.use('/blog', blog);
app.use('/login', login);
app.use('/signup', signup);
app.use('/cookie', cookie);
app.use('/logout', logout);
app.use('/profile', profile);
app.use('/createpost', createpost);

/* A simple database creation route
app.get('/createdb', (req, res) => {
  var sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if (err) { throw err; }
    console.log(result);
    res.send('Database created...');
  });
});
*/

/* Create table
app.get('/createpoststable', (req, res) => {
  var sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  db.query(sql, (err, result) => {
    if (err) { throw err; }
    console.log(result);
    res.send('Posts table created....')
  });
});
*/

/* Insert post 1
app.get('/addpost1', (req, res) => {
  var post  = {title: "Post one", body: "This is post no 1."};
  var sql = 'INSERT INTO posts SET ?';
  var query = db.query(sql, post, (err, result) => {
    if (err) { throw err; }
    console.log(result);
    res.send('Post 1 added...');
  });
});
*/

/* Insert post 2
app.get('/addpost2', (req, res) => {
  var post  = {title: "Post two", body: "This is post no 2."};
  var sql = 'INSERT INTO posts SET ?';
  var query = db.query(sql, post, (err, result) => {
    if (err) { throw err; }
    console.log(result);
    res.send('Post 2 added...');
  });
});
*/

/* Select posts
app.get('/getposts', (req, res) => {
  var sql = 'SELECT * FROM posts';
  var query = db.query(sql, (err, results) => {
    if (err) { throw err; }
    console.log(results);
    res.send('Posts fetched...');
  });
});
*/

/* Select single post
app.get('/getpost/:id', (req, res) => {
  var sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  var query = db.query(sql, (err, result) => {
    if (err) { throw err; }
    console.log(result);
    res.send('Post fetched...');
  });
});
*/

/* Update single post
app.get('/updatepost/:id', (req, res) => {
  var newTitle = 'New Updated Title';
  var sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  var query = db.query(sql, (err, result) => {
    if (err) { throw err; }
    console.log(result);
    res.send('Post updated...');
  });
});
*/

/* Delete single post
app.get('/deletepost/:id', (req, res) => {
  var newTitle = 'Updated Title';
  var sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  var query = db.query(sql, (err, result) => {
    if (err) { throw err; }
    console.log(result);
    res.send('Post deleted...');
  });
});
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
