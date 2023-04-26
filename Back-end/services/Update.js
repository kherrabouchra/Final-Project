// Update a user record by ID
function updateUser(id, updates, callback) {
    pool.query('UPDATE user SET ? WHERE id = ?', [updates, id], (err, results, fields) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
  
  module.exports = updateUser;
  