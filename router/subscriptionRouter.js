var express = require('express')
var router = express.Router()

const { subscriptionController } = require('../controller')

router.post('/usersubscribe', subscriptionController.userSubscribe)




module.exports = router;