var express = require('express')
var router = express.Router()

const { payoutController } = require('../controller')
const { auth } = require('../helpers/auth')

router.post('/payout', payoutController.payout)
router.get('/getPayoutHistory', payoutController.getPayoutHistory)
router.get('/getPendingPayout', payoutController.getPendingPayout)
router.post('/approve', payoutController.approvePayment)
 
module.exports = router;