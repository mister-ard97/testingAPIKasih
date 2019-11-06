let express = require('express')
var router = express.Router()
// var { auth } = require('../helpers/auth')

const { scholarshipController } = require('../controller')

router.post('/addScholarship', scholarshipController.postScholarship)
router.get('/getScholarshipPerUser', scholarshipController.getScholarshipPerUser )
// router.get('/getScholarship', scholarshipController.getScholarship)
router.get('/getScholarshipDetail', scholarshipController.getScholarshipDetail)
router.post('/getscholarship', scholarshipController.getAllScholarshipList)
router.put('/putScholarship', scholarshipController.putScholarship)
router.put('/cancelScholarship', scholarshipController.cancelScholarship)
router.get('/getExistStudent', scholarshipController.getExistStudent)
router.put('/putVerification', scholarshipController.putVerification)
// router.post('/getAllScholarship', scholarshipController.getAllScholarship)

module.exports = router;