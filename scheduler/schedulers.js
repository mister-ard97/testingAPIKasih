const {projectController, studentDetailController, stundentController , userController, subscriptionController} 
= require('../controller')

console.log('masuk')

const schedule = require('node-schedule');

var schedulerInvoice = schedule.scheduleJob('*/15 * * * * *', function(){
    // subscriptionController.subscriptionPayment()
    // userController.scholarshipCheck() //params
    // userController.reminderInvoice()
    // userController.projectCheck()
});



module.export = {
    // schedulerInvoice
    schedulerInvoice
}




