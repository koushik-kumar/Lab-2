var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'kkk',
  database:'canvasDB',
  port: '8889'
});


conn.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + conn.threadId);
  });

  module.exports = conn;