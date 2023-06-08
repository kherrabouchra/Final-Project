 
const express = require ('express')
const router = express.Router()
const CreateInterview = require ('../controllers/InterviewController.js')
const CreateJob = require ('../controllers/JobController.js')



router.post('/saveinterview', CreateInterview.postInterview);
router.get('/dev', CreateInterview.getDev);

// =======
// const express = require ('express')
// const router = express.Router()
// const CreateInterview = require ('../controllers/InterviewController.js')
// const CreateJob = require ('../controllers/JobController.js')



// router.post('/saveinterview', CreateInterview.postInterview);
// router.get('/dev', CreateInterview.getDev);
// router.post('/Job' , CreateJob.postJob);

// >>>>>>> 82e1c3ca4cd7f0defe1d1e9d03d1c1a385c330c5
module.exports= router;