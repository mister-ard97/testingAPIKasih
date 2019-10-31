var express = require('express')
var router = express.Router();

const { testcontroller} = require('../controller/index')

router.get('/test',testcontroller.getemail)

module.exports = router