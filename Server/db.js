const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'finalproject2023',
  database: 'botscompeteDB'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

module.exports = connection;