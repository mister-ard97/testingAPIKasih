var express = require('express')
var router = express.Router()
var {auth} = require('../helpers/auth')

const { schoolController} = require('../controller')

router.get('/getSchool', schoolController.getSchool)
router.post('/addSchool', schoolController.addSchool)
router.post('/putSchool', schoolController.putSchool)
router.post('/verifiedSchool', schoolController.verifiedSchool)
router.post('/deleteSchool', schoolController.deleteSchool)

module.exports = router