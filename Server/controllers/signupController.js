 
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const bcrypt= require('bcrypt')
 const con= require('../db')
 exports.createUser = (req, res) => {
    const checkEmailSql = "SELECT COUNT(*) AS count FROM user WHERE email = ?";
    const insertUserSql = "INSERT INTO user (username, email, password, secretKey, role) VALUES ?";
    const values = [
      req.body.username,
      req.body.email,
      req.body.password,
      speakeasy.generateSecret({
        name: req.body.username + "(botsCompete)",
      }).hex,
      req.body.type
    ];
  console.log(values);
    con.query(checkEmailSql, [req.body.email], (err, result) => {
      if (err) return res.json({ Error: "Error in checking email" });
      if (result[0].count > 0) {
        return res.json({ Error: "An account with this email already exists" });
      }
      
      bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing password" });
        values[2] = hash;
  
        con.query(insertUserSql, [[values]], (err, result) => {
          if (err) return res.json({ Error: "Error in inserting user" });
          return res.json({ Status: "Success", message: "Account successfully created!" });
        });
      });
    });
  };
  