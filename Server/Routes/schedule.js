const express = require('express');
const router = express.Router();
const hackController= require('../controllers/hackathonController')

router.get('/', hackController.getSchedules)
router.post('/', hackController.createSchedule)
router.put('/',  hackController.updateSchedule)

module.exports = router;