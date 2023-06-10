// userController.js
const connection = require("../db");
const bcrypt = require("bcrypt");

/* exports.addDevFields = (req, res) => {
  const stmt = 'INSERT INTO '
}
 */
exports.createUser = (req, res) => {
  const { username, email, password, role } = req.body;
  connection.query(
    "INSERT INTO user (  username, email, password,  role) VALUES (?, ?, ?,?,?,?,?,?)",
    [username, email, password, role],
    function (err, data, fields) {
      if (!req.body) return next(new AppError(err, 404));

      res.json({
        status: "success",
        message: "user created!",
      });
    }
  );
};

exports.getUsers = (req, res, next) => {
  connection.query("SELECT * FROM user", function (err, data, fields) {
    if (err) return res.json({ Error: err });
    res.json({
      status: "success",
      length: data?.length,
      data: data,
    });
  });
};

exports.getUserById = (req, res) => {
  if (!req.params.id) {
    return res.json({ Error: "Not found" });
  }
  connection.query(
    "SELECT * FROM user WHERE userID = ? ",
    [req.params.id],
    function (err, data, fields) {
      if (err) return res.json({ Error: "Not found" });
      res.json({
        status: "success",
        data: data,
      });
    }
  );
};

exports.getStreak = (req, res) => {
  if (!req.params.id) {
    return res.json({ Error: "Not found" });
  }
  connection.query(
    "SELECT streak FROM developer WHERE developerID = ? ",
    [req.params.id],
    function (err, data, fields) {
      if (err) return res.json({ Error: "Not found" });
      res.json({
        status: "success",
        data: data,
      });
    }
  );
};

exports.getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

exports.getDevById = (req, res) => {
  if (!req.params.id) {
    return res.json({ Error: "Not found" });
  }
  connection.query(
    "SELECT * FROM user, developer  WHERE userID = ? and developerID=userID  ",
    [req.params.id],
    function (err, data, fields) {
      if (err) return res.json({ Error: "Not found" });
      res.json({
        status: "success",
        data: data,
      });
    }
  );
};
// exports.getDevById =  (req, res) => {
//   if (!req.params.id) {
//     return ( res.json({Error:"Not found"}));
//   }
//   connection.query(
//     'SELECT * FROM user, developer, leaderboard  WHERE userID = ? and developerID=userID and userID= developer',
//     [req.params.id],
//     function (err, data, fields) {
//       if (err)
//     return ( res.json({Error:"Not found"}));
//       res.json({
//         status: "success",
//         data: data,
//       });
//     }
//   );
//  }
exports.updateUser = (req, res, next) => {
  const { id, username, email, password, country, city } = req.body;

  if (!id) {
    res.json({ Error: "user not found" });
  }

  const values = [];
  let query = "UPDATE user SET";

  if (username) {
    query += " username=?,";
    values.push(username);
  }

  if (email) {
    query += " email=?,";
    values.push(email);
  }

  if (password) {
    query += " password=?,";
    values.push(password);
  }

  if (country) {
    query += " country=?,";
    values.push(country);
  }

  if (city) {
    query += " city=?,";
    values.push(city);
  }

  // Remove trailing comma and add WHERE clause
  query = query.slice(0, -1) + " WHERE userID=?";
  values.push(id);

  connection.query(query, values, function (err, data, fields) {
    if (err) {
      res.json({ Error: err });
    }
    res.json({
      status: "success",
      message: "User updated successfully",
    });
  });
};

exports.updateDeveloper = (req, res) => {
  const userID = req.params.id;
  const { password, username, email, country, city, education, work_experience } = req.body;

  if (password === '') {
    const updateQuery =
    "UPDATE user JOIN developer ON user.userID = developer.developerID SET user.username = ?, user.email = ?, user.country = ?, user.city = ?, developer.education = ?, developer.work_experience = ? WHERE user.userID = ?;";

    // Password field is empty, update the other fields without hashing the password
    const values = [username, email, country, city, education, work_experience, userID];

    connection.query(updateQuery, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ message: "Developer updated successfully" });
      console.log(result);
    });
  } else {
    const updateQuery =
    "UPDATE user JOIN developer ON user.userID = developer.developerID SET user.password = ?, user.username = ?, user.email = ?, user.country = ?, user.city = ?, developer.education = ?, developer.work_experience = ? WHERE user.userID = ?;";

    // Password field is not empty, hash the password and update all fields
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Error in hashing password" });
      }

      const values = [hash, username, email, country, city, education, work_experience, userID];

      connection.query(updateQuery, values, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({ message: "Developer updated successfully" });
        console.log(result);
      });
    });
  }
};

exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;
  connection.query(
    "DELETE FROM user WHERE userID = ?",
    [userId],
    (err, result) => {
      if (err) {
        console.error("Error deleting user:", err);
        return res
          .status(500)
          .json({ status: "error", message: "An error occurred" });
      }

      if (result && result.affectedRows > 0) {
        return res.json({
          status: "success",
          message: "User deleted successfully",
        });
      } else {
        return res
          .status(404)
          .json({ status: "error", message: "User not found" });
      }
    }
  );
};
exports.addPoints = (req, res) => {
  const stmt =
    "UPDATE developer SET points = (points + ?) WHERE developerID = ?";

  const devID = req.params.id;
  const points = req.body.points;

  connection.query(stmt, [points, devID], (err, data) => {
    if (err) return res.status(500).json({ status: err });

    res.status(200).json({ message: `Added ${points} to ${devID}` });

    console.log(data);
  });
};

exports.getAllInstructors = (req, res, next) => {
  connection.query(
    'SELECT * FROM user where role="instructor" ',
    function (err, data, fields) {
      if (err) res.json({ Error: err });
      res.json({
        status: "success",
        length: data?.length,
        data: data,
      });
      console.log("data");
    }
  );
};
