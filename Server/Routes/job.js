const express = require('express');
const router = express.Router();
const job = require('../controllers/JobController.js');
 
router.get('/:id', job.getAllJobsbyid); 
router.get('/', job.getAllJobs)
router.post('/' , job.postJob);


module.exports = router;    