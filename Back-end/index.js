const mysql = require('mysql');
const express = require('express');
const app = express();
const env = require('dotenv');
env.config()
const cors = require('cors');

const bodyParser = require('body-parser');
const userController = require('./UserController');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})  
app.use(cors());
 
//API endpoints
app.post('/api/Signup', (req, res) => {
  userController.createUser(req.body, (err, results) => {
    if (err) throw err;
    Json.stringify(res.send(JSON.stringify(results)));
  });
});

app.get('/api/users', (req, res) => {
  userController.getUsers((err, results) => {
    if (err) throw err;
    res.setHeader('Content-Type', 'application/json');
    res.send(results); res.send(JSON.stringify(results))
  });
});

 
app.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  userController.getUserById(id, (err, results) => {
    if (err) throw err;
    
    res.send(JSON.stringify(results));
    console.log(results);
  });
});

app.put('/api/myData/:id', (req, res) => {
  const id = req.params.id;
  userController.updateUser(id, req.body, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete('/api/myData/:id', (req, res) => {
  const id = req.params.id;
  userController.deleteUser(id, (err, results)  => {
      if (err) throw err;
      res.send(results);
    });
  });

// Start the server
app.listen(3000, () => {
    
  console.log('Server listening on port 3000');
});