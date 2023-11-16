const mysql = require('mysql2');

const db = mysql.createConnection({
  host: "sql12.freesqldatabase.com",
  port: 3306,
  user: 'sql12660213',
  password: 'KjsLxnMLwY',
  database: 'sql12660213',
});
// const db = mysql.createConnection({
//   host: '127.0.0.1',
//   port: 3306,
//   user: 'root',
//   password: 'Kartheek@123',
//   database: 'repro',
// });

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:',err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;
