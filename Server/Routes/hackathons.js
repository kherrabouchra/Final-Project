const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController');

router.post('/', hackathonController.createHackathon);
router.post('/questions', hackathonController.createHackathonQuestion);
router.get('/',hackathonController.getAllHackathons );
router.get('/:id',hackathonController.getHackathon );
router.get('/instructor/:id',hackathonController.getHackathonsByInst )
router.put('/:id', hackathonController.updateHackathon)
router.delete('/:id', hackathonController.deleteHackathon)

module.exports = router;