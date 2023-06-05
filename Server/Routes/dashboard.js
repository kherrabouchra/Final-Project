const express = require('express');
const router = express.Router();
const  userController= require('../controllers/userController')
const jwt = require('jsonwebtoken')
 
 
const verifyUser = (req, res, next) => {
    if (!req.session.user) {
        return res.json({ Error: "You are not Authenticated" });
    }

    const role = req.session.user.role;
    const id = req.session.user.userID;

    req.role = role;
    req.id = id;

    next();
};

router.get('/',verifyUser, (req, res) => {
    return res.json({Status: "Success", role: req.role, id: req.userID, user:req.session.user})
})
module.exports = router;