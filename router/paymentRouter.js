var express = require('express')
var router = express.Router()

const { paymentController } = require('../controller')
const { auth } = require('../helpers/auth')


router.get('/getPayment', paymentController.getPayment )
router.post('/getSnapMd', auth, paymentController.getSnapMd)
router.post('/updatePayment', paymentController.updatePayment)
router.post('/getHistory', paymentController.getHistory)
router.post('/getDonasiProject', paymentController.getDonasiProject)
router.post('/getStatus', paymentController.getStatus)

router.get('/getSubscription', paymentController.getSubscription)
router.post('/applySubscription', paymentController.applySubscription);
router.post('/payout', paymentController.payout)
router.post('/beneficiaries', paymentController.createBeneficiaries)

module.exports = router;