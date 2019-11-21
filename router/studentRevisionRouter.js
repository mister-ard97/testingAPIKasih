var express = require('express')
var router = express.Router();
var { auth } = require('../helpers/auth')

const { studentRevisionController } = require('../controller')


router.post('/poststudentrev', auth, studentRevisionController.postStudentRevision)
router.post('/newstudentapprove/:id', auth, studentRevisionController.newStudentApprove)
router.post('/newstudentreject/:id', auth, studentRevisionController.newStudentReject)
router.get('/admingetstudent', auth, studentRevisionController.adminGetStudent)
router.put('/updateapprove', auth, studentRevisionController.updateApprove)
router.put('/updatereject', auth, studentRevisionController.updateReject)
router.get('/getstudentrev/:id', auth, studentRevisionController.getStudentRevisions)
router.get('/revertchange/:id', auth, studentRevisionController.studentRejectRevert)



module.exports = router;