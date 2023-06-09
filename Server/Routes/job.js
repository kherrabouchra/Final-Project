const express = require('express');
const router = express.Router();
const job = require('../controllers/JobController.js');
 
router.get('/:id', job.getAllJobsbyid); 
router.get('/', job.getAllJobs)
router.get('/get/:id', job.getJobById)
router.get('/get/:id/challenge', job.getJobChallenges)

router.post('/' , job.postJob);
router.post('/challenge/submission' , job.postJobChallenge);


module.exports = router;    