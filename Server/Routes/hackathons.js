const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController');

router.post('/', hackathonController.createHackathon);
router.post('/job', hackathonController.createChallenge);

router.post('/questions', hackathonController.createHackathonQuestion);
router.post('/challenge_question', hackathonController.createChallengeQuestion);

router.get('/',hackathonController.getAllHackathons );
router.get('/:id',hackathonController.getHackathon );
router.post('/:id/register',hackathonController.register );

router.get('/instructor/:id',hackathonController.getHackathonsByInst )
router.put('/:id', hackathonController.updateHackathon)
router.delete('/:id', hackathonController.deleteHackathon)

router.get('/getRegistration/:devId/:hackId', hackathonController.getRegistration)

router.post('/submission/:id', hackathonController.addSubmission)
module.exports = router;