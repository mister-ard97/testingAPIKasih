const {projectController, studentDetailController, stundentController , userController} 
= require('../controller')

console.log('masuk')

const schedule = require('node-schedule');

var schedulerInvoice = schedule.scheduleJob('*/15 * * * * *', function(){
    // userController.scholarshipCheck() //params
    // userController.reminderInvoice()
});



module.export = {
    // schedulerInvoice
    schedulerInvoice
}




