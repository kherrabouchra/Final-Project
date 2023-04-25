// userController.js
const env = require('dotenv');
env.config()
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
 
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})   

const createUser = (user, callback) => {
  // Create user in database
  // ...
  pool.query('INSERT INTO user SET ?', user, callback);
};

const getUsers = (callback) => {
  // Get all users from database
  // ... 
  pool.query('SELECT * FROM user', callback);
};

const getUserById = (id, callback) => {
  // Get user by id from database
  // ...
  pool.query('SELECT * FROM user, developer WHERE userID = ? and developerID=userID' , id, callback);
};

const updateUser = (id, user, callback) => {
  // Update user in database
  // ...
  pool.query('UPDATE users SET ? WHERE userID = ?', [user, id], callback);
};

const deleteUser = (id, callback) => {
  // Delete user from database
  // ...
  pool.query('DELETE FROM user WHERE userID = ?', id, callback);
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
