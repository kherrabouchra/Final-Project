const express = require('express');
const router = express.Router();
const instController = require('../controllers/instructorController.js');

router.get('/', instController.getAllInstructors);
router.get('/:id', instController.getInstructor);
router.get('/:id/courses', instController.getCoursesCount);
router.get('/:id/hackathons', instController.getHackCount);
router.get('/:id/schedule', instController.getScheduleByInstructor);

module.exports = router;