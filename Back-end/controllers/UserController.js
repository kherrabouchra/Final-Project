// userController.js
 const connection = require('../model/DB')
 const AppError = require('../utils/apperror')


 exports.createUser = (req, res, next) => {
  const { name, email, password , type} = req.body;
  connection.query(
    "INSERT INTO user (  username, email, password,  userType) VALUES (?, ?, ?,?,?,?,?,?)",
    [name, email, password, type],
    function (err, data, fields) {
  if (!req.body) return next(new AppError("No form data found", 404));
 
      res.status(201).json({
        status: "success",
        message: "user created!",
      });
    }
  );
};

 exports.getUsers =  (req, res, next)  => {
  res.setHeader('Content-Type', 'application/json');

  connection.query('SELECT * FROM user', function (err, data, fields) { 
    if (err) return next(new AppError(err, 404));
  
   res.status(201).json({
     status: "success",
     length: data?.length,
     data: data,
     
   }); 
  console.log("data");
 });
};

exports.getUserById =  (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("No user id found", 404));
  }
  connection.query(
    'SELECT * FROM user, developer WHERE userID = ? and developerID=userID',
    [req.params.id],
    function (err, data, fields) {
      if (err) return next(new AppError(err, 404));
      res.status(201).json({
        status: "success",
        length: data?.length,
        data: data,
      });
    }
  );
 };exports.updateUser = (req, res, next) => {
  const { userID, username, email, password, country, city, secretKey, userType } = req.body;

  if (!userID) {
    return next(new AppError("No user ID found", 404));
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

  if (secretKey) {
    query += " secretKey=?,";
    values.push(secretKey);
  }

  if (userType) {
    query += " userType=?,";
    values.push(userType);
  }

  // Remove trailing comma and add WHERE clause
  query = query.slice(0, -1) + " WHERE userID=?";
  values.push(userID);

  connection.query(query, values, function (err, data, fields) {
    if (err) return next(new AppError(err, 500));
    res.status(201).json({
      status: "success",
      message: "User updated successfully",
    });
  });
};



exports.deleteUser = (req, res, next) => {
  const userId = req.params.id;
  connection.query('DELETE FROM user WHERE userID = ?', [userId], (err, result) => {
    if (err) return next(new AppError(err, 404));
    if (!result.changedRows) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }
    res.status(201).json({
      status: 'success',
      message: 'User deleted successfully',
    });
  });
};

