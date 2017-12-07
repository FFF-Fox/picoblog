const mysql = require('mysql');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  // password: process.env.MYSQL_PASS,
  database: 'nodemysql',
  connectionLimit: 100,
  // supportBigNumbers: true
});

const handleQuery = function(sql, callback) {
  // get a connection from the pool
  pool.getConnection(function(err, connection) {
    if(err) { console.log(err); callback(true); return; }
    // make the query
    connection.query(sql, function(err, results) {
      connection.release();
      if(err) { console.log(err); callback(true); return; }
      callback(false, results);
    });
  });
};

// Get all the blog posts
exports.getBlogPosts = function(callback) {
  const sql = 'SELECT * FROM posts';
  handleQuery(sql, callback);
};

// Get the user's id and password based on their username
exports.getUserIdPassword = function(username, callback) {
  const sql = `SELECT id, password FROM users WHERE username='${username}'`;
  handleQuery(sql, callback);
};

// Get the user's id based on their username
exports.getUserId = function(username, callback) {
  const sql = `SELECT id FROM users WHERE username='${username}'`;
  handleQuery(sql, callback);
};

// Sign up the user to the database
exports.signUpUser = function(username, password, callback) {
  const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
  handleQuery(sql, callback);
};

// Add a new post to the database posts table
exports.addNewPost = function(title, body, callback) {
  const sql = `INSERT INTO posts (title, body) VALUES ('${title}', '${body}')`;
  handleQuery(sql, callback);
};
