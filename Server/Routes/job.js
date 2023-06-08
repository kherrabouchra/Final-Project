const express = require('express');
const router = express.Router();
const job = require('../controllers/JobController.js');
 
router.get('/:id', job.getAllJobs); 


module.exports = router;    