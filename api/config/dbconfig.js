var mysql = require('mysql');
var config = require('./config.js');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host: config.mongodb.host,
  user: config.mongodb.user,
  password: config.mongodb.password,
  database: config.mongodb.database,
  multipleStatements: config.mongodb.multipleStatements
});
// Attempt to catch disconnects
pool.on('connection', function (connection) {
  console.log('DB Connection established');

  connection.on('error', function (err) {
    console.error(new Date(), 'MySQL error', err.code);
  });
  connection.on('close', function (err) {
    console.error(new Date(), 'MySQL close', err);
  });
});

module.exports = pool;
