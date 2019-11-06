var express = require('express')
var router = express.Router();
var { auth } = require('../helpers/auth')

// untuk postproject, getproject (bukan yg allproject), edit project dan deleteproject pake auth ven biar ga semua orang nembak dari postman
// ok? thanks.

const { projectController } = require('../controller/index')

router.post('/postproject', auth, projectController.postProject)
router.post('/getproject',auth, projectController.getProject);
router.post('/searchproject', projectController.searchProject);

router.get('/getAllProject', projectController.getAllProject)
router.get('/getDetailProject', projectController.getDetailProject);

router.put('/editproject/:id', projectController.editProject)
router.post('/GenerateURL',projectController.generateImgUrlquill)
router.put('/deleteproject/:id', projectController.deleteProject)

router.post('/GenerateURL',projectController.generateImgUrlquill)

module.exports = router