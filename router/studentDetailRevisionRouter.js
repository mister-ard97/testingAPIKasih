

var express = require('express')
var router = express.Router();
var { auth } = require('../helpers/auth')

const { studentDetailRevisionController } = require('../controller');

router.get('/student-detail-unverified', auth, studentDetailRevisionController.getStudentUnverified);
router.get('/get-student-detailrev/:id', auth, studentDetailRevisionController.getStudentDetailUnverified);
router.post('/newStudentDetailApprove/:id', auth, studentDetailRevisionController.postStudentDetailApprove);
router.post('/StudentDetailRejected', auth, studentDetailRevisionController.postStudentDetailRejected);

router.get('/student-detail-compare/:id', auth, studentDetailRevisionController.getStudentDetailRevision);
router.post('/studentdetail-update-approve', auth, studentDetailRevisionController.approveUpdateDetailRevision);
router.post('/studentdetail-update-reject', auth, studentDetailRevisionController.rejectUpdateDetailRevision);
router.get('/revertDetail/:id', auth, studentDetailRevisionController.detailRevertChange);


module.exports = router