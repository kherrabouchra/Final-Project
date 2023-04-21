// Create a new user record
function createUser(user, callback) {
    pool.query('INSERT INTO user SET ?,?', [email, password ] , (err, results, fields) => {
      if (err) return callback(err);
      callback(null, results);
    });
  }
  
  module.exports = createUser;
  