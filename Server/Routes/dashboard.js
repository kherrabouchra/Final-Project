const express = require('express');
const router = express.Router();
const  userController= require('../controllers/userController')
const jwt = require('jsonwebtoken')
 
 
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(req.session.user){
        console.log("user: ", req.session.user);
    if(!token) {
        return res.json({Error: "You are not Authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) return res.json({Error: "Token wrong"});
            req.role = decoded.role;
            req.id = decoded.userID;
            next();
        } )
    }}
}
router.get('/',verifyUser, (req, res) => {
    return res.json({Status: "Success", role: req.role, id: req.userID, user:req.session.user})
})
module.exports = router;