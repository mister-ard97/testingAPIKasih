const { Sequelize, sequelize, Payment, User, Project }  = require('../models')
const midtransClient                                    = require('midtrans-client')
const moment                                            = require('moment')
const Axios = require('axios')
const snap = new midtransClient.Snap({
    isProduction    : false,
    serverKey       : 'SB-Mid-server-Dr8HK_lJ4cuEZi4rUgNcsDUR',
    clientKey       : 'SB-Mid-client-Ttge99xVU4AOz44T'
})


module.exports = {
    //====================// midtrans //====================
    getSnapMd : (req, res) => {
        let { projectId, userId, komentar, anonim, scholarshipId, paymentSource} = req.body.userData
        let { gross_amount, order_id} = req.body.parameter.transaction_details
        let { parameter } = req.body
        console.log('masuk get token midtrans')
        console.log(req.body)
        console.log(order_id)
        var Date = moment().format("YYMMDD")
        var randInt = Math.floor(Math.random()*(999-100+1)+100)
        // Halo jjhjhjhjkhhjhjj
        // kol md 6
        snap.createTransaction(parameter)
        .then((transaction)=>{
            transactionToken = transaction.token;
            console.log('transactionToken: ', transactionToken)

            //######## INSERT DATABASE 
            Payment.create({
                paymentType: 'pending',
                nominal: gross_amount,
                statusPayment: 'pending',
                paymentSource,
                projectId: projectId ? projectId : null,
                scholarshipId: scholarshipId ? scholarshipId : null,
                userId: userId,
                isRefund: '0',
                isDeleted: '0',
                order_id: order_id,
                komentar: komentar,
                isAnonim: anonim
            }).then(()=>{
                Payment.findAll()
                .then((result)=>{
                    console.log(result)
                    res.send(result)

                })
            }).catch((err)=>{
                console.log(err)
            })
            return res.status(200).send({transactionToken, order_id: parameter.transaction_details.order_id})
        })       
    },

    getStatus:(req,res)=>{
        
        const {order_id} = req.body
        console.log('========masuk getStatus =============')


        snap.transaction.status(order_id)
        .then((Response)=>{
            console.log('=======masuk status=========')
            console.log( Response)
            let status = {
                order_id : Response.order_id,
                transaction_status : Response.transaction_status
            }
            
            //kirim respond status payment ke ui payment page dari push notification midtrans lewat socket io
            req.app.io.emit('status_transaction', status)
            
            //update payment status on database
            Payment.update({
                paymentType : Response.payment_type,
                statusPayment : Response.transaction_status,
                updateAt: Response.transaction_time
            },
            {
                where : {
                    order_id : Response.order_id
                }
            })

            mockNotificationJson = Response     
            snap.transaction.notification(Response)
                .then((statusResponse)=>{
                    console.log('=======masuk notification=========')
                    console.log(statusResponse)

                    let orderId = statusResponse.order_id
                    let transactionStatus = statusResponse.transaction_status
                    let fraudStatus = statusResponse.fraud_status

                    let msg = `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`

                    if(transactionStatus == 'settlement'){
                  
                        if(fraudStatus == 'challenge'){
                      
                            return res.status(200).send(msg)
                        }else if(fraudStatus == 'accept'){
                      
                            return res.status(200).send(msg)
                        }
                    }else if(transactionStatus == 'cancel' || transactionStatus == 'failure'){
               
                        return res.status(200).send(msg)
                    }else if(transactionStatus == 'pending'){
             
                        return res.status(200).send(msg)
                    }
                })      
            })
    },


    //====================// end of midtrans //====================

    getPayment : (req, res)=>{
        console.log('payment')
        res.send('payment')
        Payment.findAll()
        .then((result)=>{
            console.log(Payment)
            console.log(result)
            res.status(200).send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
    },
    updatePayment : (req, res) => {
        console.log('masuk update payment ===> ')
        console.log(req.body)
        let { payment_type, transaction_status, transaction_time, order_id} = req.body
        Payment.update({
            paymentType : payment_type,
            statusPayment : transaction_status,
            updateAt: transaction_time
        },
        {
            where : {
                order_id
            }
        })

        .then(() => {
            Payment.findAll({ where : { order_id}})
            .then((result) => {
                console.log(result)
                res.send(result)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    },
    getHistory: (req, res) => {
        console.log('masuk history')
        let {userId} = req.body
        console.log(req.body)
        Payment.findAll({
            attributes: ['nominal', 'statusPayment', 'updatedAt', 'isAnonim', 'komentar', 'createdAt', 'order_id', 'paymentType'],
            where: { userId },
            include: [
                {
                    model: User,
                    attributes: ['nama']
                },
                {
                    model: Project,
                    attributes: [
                        ['name', 'projectName'],
                        'projectImage'
                    ]
                }
            ]
        })
        .then((result)=>{
            console.log(result)
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
    },
    getDonasiProject: (req,res) => {
        // console.log('masuk getDonasiProject')
        let { projectId, scholarshipId } = req.body
        console.log(req.body)
        Payment.findAll({
            attributes: ['nominal','updatedAt', 'komentar', 'isAnonim'],
            where: { 
                projectId: projectId ? projectId : null,
                scholarshipId : scholarshipId ? scholarshipId : null,
                
                statusPayment: 'settlement'
             },
            include: [
                {
                    model: User,
                    attributes: ['nama']
                }
            ]
        })
        .then((result) => {
            // console.log('===========>>>>>>>')
            // console.log(result)
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        }
        )
    },
    getSubscription : (req,res) => {
        User.findOne({
            where: {
                email: req.body.email
            },
            attributes: ['subscriptionStatus', 'subscriptionNominal']
        }).then((results) => {
            res.status(200).send(results)
        })
    },
    applySubscription : (req,res) => {
        var { subscriptionNominal, email, reminderDate } = req.body
        console.log('--------------------------------------------------------------------')
        console.log(req.body)
        if(!email){
            return null
        }
        // console.log(req.body)
        User.update({
            subscriptionStatus: 1,
            subscriptionNominal,
            reminderDate
        },{
            where: { email }
        })
        .then((result) => {
            console.log('masuk')
            res.status(200).send(result)
        })
        .catch((err) => {
            console.log(err)
        })
    },

    payout:(req,res)=>{
        // console.log('--------------------------> masuk payout')
        console.log(req.body)
        Axios({
            headers: {
              'Content-Type': 'application/json',
              "Accept":"application/json",
            },
            method: 'post',
            url: 'https://app.sandbox.midtrans.com/iris/api/v1/payouts',
            auth: {
              username: 'IRIS-83f135ed-3513-47bf-81bb-a071822ee68f'
            },
            data: req.body
            })
            .then((ress)=>{
                    console.log(ress.data)
                    return res.status(200).send(ress.data)
                }).catch((err)=>{
                    console.log(err)
                    return res.status(400).send(err)
                })

    },
    createBeneficiaries:  (req,res)=>{
        console.log('--------------------------> masuk Beneficiaries')
        console.log(req.body)
        Axios({
            headers: {
              'Content-Type': 'application/json',
              "Accept":"application/json",
            },
            method: 'post',
            url: 'https://app.sandbox.midtrans.com/iris/api/v1/beneficiaries',
            auth: {
              username: 'IRIS-83f135ed-3513-47bf-81bb-a071822ee68f'
            },
            data: req.body
            })
            .then((ress)=>{
                    console.log(ress.data)
                    return res.status(200).send(ress.data)
                }).catch((err)=>{
                    // console.log('----error cuy')
                    console.log(err)
                    // console.log(err.response.data)
                    return res.status(400).send({message: err.response.data})
                })
    },
    getListBank : (req, res) => {
        console.log('-------------- > list bank')
        Axios({
            headers: {
              'Content-Type': 'application/json',
              "Accept":"application/json",
            },
            method: 'get',
            url: 'https://app.sandbox.midtrans.com/iris/api/v1/beneficiary_banks',
            auth: {
              username: 'IRIS-83f135ed-3513-47bf-81bb-a071822ee68f'
            }
        })
        .then((ress)=>{
                // console.log(ress.data)
                return res.status(200).send(ress.data)
            }).catch((err)=>{
                console.log(err)
                return res.status(400).send(err)
        })
    },
    validateBankAccount : (req, res) => {
        console.log('------------------------ validate bank account')
        const {code, account} = req.body
        console.log(req.body)
        Axios({
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Cache-Control": "no-cache"
            },
            method: 'get',
            url: `https://app.sandbox.midtrans.com/iris/api/v1//account_validation?bank=${code}&account=${account}`,
            auth: {
              username: 'IRIS-83f135ed-3513-47bf-81bb-a071822ee68f'
            }
        })
        .then((ress)=>{
            // console.log(ress.data)
            return res.status(200).send(ress.data)
        }).catch((err)=>{
            console.log(err)
            return res.status(400).send({message: err.response.data})
    })
    }


    

}