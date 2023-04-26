// Delete a user record by ID
function deleteUser(id, callback) {
    pool.query('DELETE FROM user WHERE id = ?', [id], (err, results, fields) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
  
  module.exports = deleteUser;

  