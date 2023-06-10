const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/courseController.js');

router.post('/', CourseController.createCourse);
router.get('/', CourseController.getAllCourses);
router.get('/getAll/:id', CourseController.getAllCoursesByInst);
router.get('/:id', CourseController.getCourse);
router.get('/enrolled/:id', CourseController.getEnrolledCourses);
// router.post('/enrolled/', CourseController.getEnrolledCourses);

router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);

router.post('/quiz/create', CourseController.createQuiz);
router.put('/quiz/update/:id', CourseController.updateQuiz);

router.get('/chapters/getAll/:id', CourseController.getAllChapters);
router.get('/chapters/get/:id', CourseController.getChapter);
router.post('/chapters/create', CourseController.createChapter);

router.get('/lessons/getAll/:id', CourseController.getAllLessons);
router.get('/lessons/getAll/course/:id', CourseController.getAllLessonsBycourse);

router.get('/lessons/get/:id', CourseController.getLesson);
router.get('/lessons/getByCourse/:id', CourseController.getCourseLesson);

router.post('/lessons/create', CourseController.createLesson);
router.put('/lessons/update/:id', CourseController.updateLesson);
module.exports = router;
 