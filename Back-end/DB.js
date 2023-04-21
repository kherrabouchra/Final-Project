const mysql = require('mysql');
const express = require('express');
const app = express();

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123azer123',
  database: 'FinalDB',
});

// Make a query to the database
pool.query('SELECT * FROM user', (err, results, fields) => {
  if (err) throw err;
  console.log(results);
});

// Use the connection pool in your API endpoints
app.get('/api/myData', (req, res) => {
  pool.query('SELECT * FROM user', (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
