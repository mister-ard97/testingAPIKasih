const userRouter = require('./userRouter')
const paymentRouter = require('./paymentRouter')
const projectRouter = require('./projectRouter')
const studentRouter=require('./studentRouter')
// const studentDetailRouter = require('./studentDetailRouter')
const testRouter=require('./testrouter')
const studentRevisionRouter = require('./studentRevisionRouter')
const scholarshipRouter = require('./scholarshipRouter')
// const studentDetailRevisionRouter = require('./studentDetailRevisionRouter');
const subscriptionRouter = require('./subscriptionRouter')
// const schoolRouter = require('./schoolRouter')
const payoutRouter = require('./payoutRouter')

module.exports = {
    userRouter,
    paymentRouter,
    userRouter,
    studentRouter,
    projectRouter,
    // studentDetailRouter,
    testRouter,
    studentRevisionRouter,
    // studentDetailRevisionRouter,
    subscriptionRouter,
    scholarshipRouter,
    // schoolRouter,
    payoutRouter
}