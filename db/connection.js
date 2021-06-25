const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Port
  port: 3306,

  // Username
  user: 'root',

  // Password
  password: 'password',
  database: 'employee_db',
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
});

module.exports = connection;