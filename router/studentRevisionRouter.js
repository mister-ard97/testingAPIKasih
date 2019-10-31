var express = require('express')
var router = express.Router()

const { studentRevisionController } = require('../controller')


router.post('/poststudentrev', studentRevisionController.postStudentRevision)
router.post('/newstudentapprove/:id', studentRevisionController.newStudentApprove)
router.post('/newstudentreject/:id', studentRevisionController.newStudentReject)
router.get('/admingetstudent', studentRevisionController.adminGetStudent)
router.put('/updateapprove', studentRevisionController.updateApprove)
router.put('/updatereject', studentRevisionController.updateReject)
router.get('/getstudentrev/:id', studentRevisionController.getStudentRevisions)
router.get('/revertchange/:id', studentRevisionController.studentRejectRevert)



module.exports = router;