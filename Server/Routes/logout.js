 
const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) => {
    req.session.destroy(function(err){
        if(err){
           console.log(err);
        }
    res.clearCookie('userID'); 
        res.redirect('/') 
     });


    return res.json({Status: "Logout Success"});
})
module.exports = router;


 