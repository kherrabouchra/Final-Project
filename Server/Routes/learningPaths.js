const express = require('express');
const router = express.Router();
const PathController = require('../controllers/pathController.js');
const CourseController = require('../controllers/courseController.js');

router.post('/', PathController.createPath);
router.get('/', PathController.getAllPaths);
router.get('/:id', PathController.getPath);
router.put('/:id', PathController.updatePath);
router.delete('/:id', PathController.deletePath);

router.post('/courses', PathController.createCoursePath); 
router.get('/courses/:id', PathController.getAllCoursesPath);
router.put('/courses/:id', CourseController.updateCourse);
router.delete('courses/:id', CourseController.deleteCourse);
router.get('/courses/getquiz/:id', PathController.getQuizCount);


module.exports = router;    