var express = require('express')
var router = express.Router()

const { paymentController } = require('../controller')
const { auth } = require('../helpers/auth')


// router.get('/getPayment', paymentController.getPayment )
router.post('/getSnapMd', auth, paymentController.getSnapMd)
router.post('/updatePayment', paymentController.updatePayment)
router.post('/getHistory',auth, paymentController.getHistory)
router.get('/getHistoryAdmin', auth, paymentController.getHistoryAdmin) // BUTUH PROTEKSI ROLE = USERADMIN
router.post('/getDonasiProject', paymentController.getDonasiProject)
router.post('/getStatus', paymentController.getStatus)
router.post('/createPayment', paymentController.addPayment)

router.get('/getSubscription', paymentController.getSubscription)
router.post('/applySubscription', paymentController.applySubscription);
router.post('/payout', paymentController.payout)
router.post('/beneficiaries', paymentController.createBeneficiaries)
router.get('/beneficiary_banks', paymentController.getListBank)
router.post('/validateBankAccount', paymentController.validateBankAccount)

module.exports = router;