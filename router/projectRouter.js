var express = require('express')
var router = express.Router();
var { auth } = require('../helpers/auth')

// untuk postproject, getproject (bukan yg allproject), edit project dan deleteproject pake auth ven biar ga semua orang nembak dari postman
// ok? thanks.

const { projectController } = require('../controller/index')

router.post('/postproject', auth, projectController.postProject);

// getproject untuk semua user
router.post('/getproject',auth, projectController.getProject);

// searchproject untuk semua orang bisa liat project
router.post('/searchproject', projectController.searchProject);

router.get('/getDetailProject', projectController.getDetailProject);

router.put('/editproject/:id', auth, projectController.editProject)
router.post('/GenerateURL', auth, projectController.generateImgUrlquill)
router.put('/deleteproject/:id', auth, projectController.deleteProject)

router.post('/GenerateURL',projectController.generateImgUrlquill)
router.post('/deleteFileQuill', projectController.deleteFileQuill)

module.exports = router