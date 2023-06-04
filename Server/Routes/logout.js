 
const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) => {
    req.session.destroy(function(err){
        if(err){
           console.log(err);
        }else{
            console.log(session);
            req.end();
            res.redirect('/');
        }
     });
    res.clearCookie('token'); 


    return res.json({Status: "Success"});
})
module.exports = router;


 