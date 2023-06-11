const express = require('express');
const router = express.Router();
const job = require('../controllers/JobController.js');

// Job Routes
router.get('/', job.getAllJobs);
router.get('/:id', job.getAllJobsbyid);
router.get('/get/:id', job.getJobById);
router.get('/get/:id/challenge', job.getJobChallenges);
router.post('/', job.postJob);
router.post('/challenge/submission', job.postJobChallenge);

// Analytics Routes
router.get('/analytic/jobmounth', job.fetchJobOfferData);
router.get('/analytic/claimsmounth', job.getClaimData);
router.get('/analytic/challengemounth', job.getChallengeData);
router.get('/analytic/banneduser', job.getUserBanner);
router.get('/analytic/coursmounth', job.fetchCourseMounth);
router.get('/analytic/dev', job.getDev);
router.get('/analytic/postanalytics', job.postAnalytics);

module.exports = router;