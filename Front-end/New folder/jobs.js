const express = require('express');
const router = express.Router();
const jobsController =require('../controllers/jobsController')

router.get('/getjobs', jobsController.getJobs );
router.get('/getjob/:id', jobsController.getJobsByID);



module.exports = router;