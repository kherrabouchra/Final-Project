const express = require('express');
const router = express.Router();
const claimctrl = require ('../controllers/claimsController')

router.get('/', claimctrl.getClaims)
router.post('/', claimctrl.createClaim)
router.post('/deny/:id', claimctrl.denyClaim)
router.get('/:id',claimctrl.getClaimById)
router.get('/user/:id',claimctrl.getUserClaims)
router.delete('/:id', claimctrl.deleteClaim)
router.post('/reply/:id' , claimctrl.createClaimReply)
module.exports = router;