var express = require('express')
var router = express.Router()
var { auth } = require('../helpers/auth')
const{stundentController}=require('../controller')

// router.get('/getstudentdata',stundentController.getStudentdata)
router.post('/poststudentdata', auth, stundentController.postStudentdata)
router.post('/getstudentdatapaging', auth, stundentController.getStudentdatapaging);
router.get('/get-student-detail/:id', stundentController.getStudentDetails);

router.get('/getstudentadmin', auth, stundentController.getStudentAdmin) // BUTUH PROTEKSI ROLE = USERADMIN
router.put('/putstudentdata/:id', auth, stundentController.putStudentdata)
router.delete('/deletestudentdata/:id', auth, stundentController.deleteStudentdata)
router.get('/getstudentperuser', auth, stundentController.getStudentPerUser)



module.exports=router