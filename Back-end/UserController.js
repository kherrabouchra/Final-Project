// userController.js

const pool = require('./mysql');

const createUser = (user, callback) => {
  // Create user in database
  // ...
  pool.query('INSERT INTO users SET ?', user, callback);
};

const getUsers = (callback) => {
  // Get all users from database
  // ...
  pool.query('SELECT * FROM users', callback);
};

const getUserById = (id, callback) => {
  // Get user by id from database
  // ...
  pool.query('SELECT * FROM users WHERE id = ?', id, callback);
};

const updateUser = (id, user, callback) => {
  // Update user in database
  // ...
  pool.query('UPDATE users SET ? WHERE id = ?', [user, id], callback);
};

const deleteUser = (id, callback) => {
  // Delete user from database
  // ...
  pool.query('DELETE FROM users WHERE id = ?', id, callback);
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
