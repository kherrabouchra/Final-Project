const express = require ('express')
const router = express.Router()
const CreateInterview = require ('../controllers/CreateInterview.js')
const CreateJob = require ('../controllers/CreateJob.js')



router.post('/saveinterview', CreateInterview.postInterview);
router.get('/dev', CreateInterview.getDev);
router.post('/Job' , CreateJob.postJob);

module.exports= router;