const express = require('express');
const router = express.Router();
const loginController= require('../controllers/loginController')


router.post('/', loginController.handleLogin)
router.get('/', loginController.handlesession)

module.exports = router;