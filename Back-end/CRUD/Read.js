// Get all user records
function getUsers(callback) {
    pool.query('SELECT * FROM user', (err, results, fields) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
  
  // Get a single user record by ID
  function getUserById(id, callback) {
    pool.query('SELECT * FROM user WHERE userID = ?', [id], (err, results, fields) => {
      if (err) return callback(err);
      callback(null, results[0]);
    });
  }
  
  module.exports = {
    getUsers,
    getUserById,
  };
  