var express = require('express')
var router = express.Router()

var { auth } = require('../helpers/auth')

const { subscriptionController } = require('../controller')

router.post('/usersubscribe', auth, subscriptionController.userSubscribe)
router.get('/subscribelist/:id', auth, subscriptionController.getUserSubscriptionList)
router.post('/cancelsubscription', auth, subscriptionController.cancelSubscription)
router.post('/subscriptionpay',subscriptionController.subscriptionPayment)
router.post('/getnominal/:id',subscriptionController.getUserSubscriptionNominal)

module.exports = router;