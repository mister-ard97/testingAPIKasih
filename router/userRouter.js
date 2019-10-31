var express = require('express')
var router = express.Router();
var { auth, resetToken } = require('../helpers/auth')

const { userController } = require('../controller')

router.post('/register', userController.registerUser);
router.put('/emailVerification', auth, userController.emailVerification);
router.post('/resendEmailVerification', auth, userController.resendEmailVerification);
router.post('/keepLogin', auth, userController.keepLogin);
router.post('/login', userController.userLogin);
router.post('/loginGmail', userController.loginWithGoogle);
router.post('/loginFacebook', userController.loginWithFacebook);
router.get('/getschool', userController.getSchool);

router.post('/userForgotPassword', userController.getResetPasswordToken);
router.get('/userGetResetToken', resetToken, userController.userCheckResetToken);
router.post('/newPasswordUser', resetToken, userController.userResetPassword);
router.post('/userChangePassword', auth, userController.userChangePassword);



module.exports = router