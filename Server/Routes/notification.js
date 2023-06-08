const express = require('express');
const router = express.Router();
const notificationctrl = require('../controllers/notificationController');

router.get('/:id', notificationctrl.getNotifications);
router.get('/inst/:id', notificationctrl.getNotificationsInst);
router.get('/dev/:id', notificationctrl.getNotificationsInst);

router.post('/',notificationctrl.createNotification )
module.exports = router;
