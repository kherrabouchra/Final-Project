const express = require('express');
const router = express.Router();
const loginController= require('../controllers/loginController')


router.post('/', loginController.handle2FAVerification)


module.exports = router;