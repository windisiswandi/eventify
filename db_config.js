const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_appevent',
  port: 3306,
});

conn.connect(function (err) {
  if (err) throw err;
  console.log('Database Connected!');
});

module.exports = conn;
