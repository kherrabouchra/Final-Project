 
const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) => {
    req.session.destroy();
    res.clearCookie('token'); 


    return res.json({Status: "Success"});
})
module.exports = router;


 