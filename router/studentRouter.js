var express = require('express')
var router = express.Router()
var { auth } = require('../helpers/auth')
const{stundentController}=require('../controller')

router.post('/poststudentdata',stundentController.postStudentdata)
router.get('/getstudentdata',stundentController.getStudentdata)
router.post('/getstudentdatapaging',auth,stundentController.getStudentdatapaging)
router.put('/putstudentdata/:id',stundentController.putStudentdata)
router.delete('/deletestudentdata/:id',stundentController.deleteStudentdata)
router.get('/getstudentperuser', stundentController.getStudentPerUser)



module.exports=router