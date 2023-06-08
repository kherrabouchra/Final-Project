const express = require ('express')
const router = express.Router()
const CreateInterview = require ('../controllers/InterviewController.js')
const CreateJob = require ('../controllers/JobController.js')



router.post('/saveinterview', CreateInterview.postInterview);
router.get('/dev', CreateInterview.getDev);
router.post('/Job' , CreateJob.postJob);

module.exports= router;