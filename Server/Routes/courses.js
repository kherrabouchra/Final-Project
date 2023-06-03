const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController.js');

router.post('/', CourseController.createCourse);
router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getCourse);
router.get('/quiz/:id', CourseController.getQuizCount);
router.post('/quiz/create', CourseController.createQuiz);

router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);
router.get('/chapters/getAll/:id', CourseController.getAllChapters);
router.get('/chapters/get/:id', CourseController.getChapter);
router.post('/chapters/create', CourseController.createChapter);

router.get('/lessons/getAll/:id', CourseController.getAllLessons);
router.get('/lessons/get/:id', CourseController.getLesson);
router.post('/lessons/create', CourseController.createLesson);

module.exports = router;