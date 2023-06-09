const express = require('express');
const router = express.Router();
const  userController= require('../controllers/userController')
const jwt = require('jsonwebtoken')

router.get('/:id', userController.getDevById) 
router.get('/', userController.getUsers)
router.put('/:id',userController.updateUser )
router.post('/', userController.createUser)
router.delete('/:id', userController.deleteUser)
router.get('/current', userController.getCurrentUser)

router.put('/addPoints/:id', userController.addPoints)
module.exports = router;