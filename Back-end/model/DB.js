
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password:'finalproject23',
  database: 'FinalDB'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

module.exports = connection;
// // Make a query to the database
// pool.query('SELECT * FROM user', (err, results, fields) => {
//   if (err) throw err;
//   console.log(results);
// });

// // Use the connection pool in your API endpoints
// app.get('/api/myData', (req, res) => {
//   pool.query('SELECT * FROM user', (err, results, fields) => {
//     if (err) throw err;
//     res.send(results);
//   });
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server listening on port 3000');
// });
