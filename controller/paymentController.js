const { Sequelize, sequelize, Payment, User, Project, scholarship, Student }  = require('../models')
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
        // let { projectId, userId, komentar, anonim, scholarshipId, paymentSource} = req.body.userData
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
            // console.log('transactionToken: ', transactionToken)

            //######## INSERT DATABASE 
            // Payment.create({
            //     paymentType: 'pending',
            //     nominal: gross_amount,
            //     statusPayment: 'pending',
            //     paymentSource,
            //     projectId: projectId ? projectId : null,
            //     scholarshipId: scholarshipId ? scholarshipId : null,
            //     userId: userId,
            //     isRefund: '0',
            //     isDeleted: '0',
            //     order_id: order_id,
            //     komentar: komentar,
            //     isAnonim: anonim
            // }).then(()=>{
            //     // if paymentSource === Subscription, subscription update remainderDate + 1 month from column (or now), (if settlement)
            //     Payment.findAll()
            //     .then((result)=>{
            //         // console.log(result)
            //         res.send(result)

            //     })
            // }).catch((err)=>{
            //     console.log(err)
            // })
            return res.status(200).send({transactionToken, order_id: parameter.transaction_details.order_id})
        })       
    },

    addPayment : (req, res) => {
        //######## INSERT DATABASE 
        console.log('------------------------------> Masuk Add payment')
        const {userId, paymentType, gross_amount, statusPayment, projectId, scholarshipId, komentar, anonim, order_id, paymentSource, noPembayaran} = req.body
        Payment.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            where:({
                order_id
            })
        }).then((result) => {
            console.log(result)
            if(result.length === 0){
                console.log('insert--------')
                Payment.create({
                    paymentType,
                    nominal: gross_amount,
                    statusPayment,
                    paymentSource,
                    projectId: projectId ? projectId : null,
                    scholarshipId: scholarshipId ? scholarshipId : null,
                    userId: userId,
                    isRefund: '0',
                    isDeleted: '0',
                    order_id: order_id,
                    komentar: komentar,
                    isAnonim: anonim,
                    noPembayaran
                }).then(()=>{
                    Payment.findAll()
                    .then((result)=>{
                        console.log(result)
                        res.status(200).send({message: 'create Payment Success ', result})
                    })
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }).catch((err)=>{
            console.log('tidak ada')
            console.log(err)
        })
    },

    getStatus:(req,res)=>{
        
        const {order_id} = req.body
        console.log('========masuk getStatus =============')
        
        if(req.body.order_id){
            console.log(req.body)
            //######## INSERT DATABASE
             
            
        }

        snap.transaction.status(order_id)
        .then((Response)=>{
            console.log('=======masuk status=========')
            console.log( Response)
            let bank = ''
            let noPembayaran = ''
            if(Response.va_numbers){
                bank = `${Response.va_numbers[0].bank}`
                noPembayaran = Response.va_numbers
                console.log('1')
            }else if(Response.biller_code){
                bank = 'mandiri'
                noPembayaran = `
                Kode bank : ${Response.biller_code} 
                Kode Pembayaran : ${Response.bill_key}`
                console.log('2')
            }else if(Response.permata_va_number){
                bank = 'permata'
                noPembayaran = Response.permata_va_number
                console.log('3')
            }else if(Response.bank){
                bank = Response.bank
                noPembayaran = ''
                console.log('4')
            }else if(Response.payment_type === 'gopay'){
                noPembayaran = `https://api.sandbox.veritrans.co.id/v2/gopay/${Response.transaction_id}/qr-code`

            }else{
                bank = ''
            }
            let status = {
                order_id : Response.order_id,
                transaction_status : Response.transaction_status,
                payment_type : Response.payment_type,
                bank,
                noPembayaran
            }
            console.log(status)

            
            //kirim respond status payment ke ui payment page dari push notification midtrans lewat socket io
            req.app.io.emit(`status_transaction`, status)
            
            // update payment status on database
            Payment.findAll({
                where:{
                    order_id : Response.order_id
                }
            }).then((result)=>{
                Payment.update({
                    statusPayment : Response.transaction_status
                },
                {
                    where : {
                        order_id : Response.order_id
                    }
                })
            })

            // mockNotificationJson = Response     
            // snap.transaction.notification(Response)
            //     .then((statusResponse)=>{
            //         // console.log('=======masuk notification=========')
            //         // console.log(statusResponse)

            //         let orderId = statusResponse.order_id
            //         let transactionStatus = statusResponse.transaction_status
            //         let fraudStatus = statusResponse.fraud_status

            //         let msg = `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`

            //         if(transactionStatus == 'settlement'){
                  
            //             if(fraudStatus == 'challenge'){
                      
            //                 return res.status(200).send(msg)
            //             }else if(fraudStatus == 'accept'){
                      
            //                 return res.status(200).send(msg)
            //             }
            //         }else if(transactionStatus == 'cancel' || transactionStatus == 'failure'){
               
            //             return res.status(200).send(msg)
            //         }else if(transactionStatus == 'pending'){
             
            //             return res.status(200).send(msg)
            //         }
            //     })
            return res.status(200).send(status)
            })
    },


    //====================// end of midtrans //====================

    // getPayment : (req, res)=>{
    //     console.log('payment')
    //     res.send('payment')
    //     Payment.findAll()
    //     .then((result)=>{
    //         console.log(Payment)
    //         console.log(result)
    //         res.status(200).send(result)
    //     })
    //     .catch((err)=>{
    //         console.log(err)
    //     })
    // },
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
                return res.status(200).send(result)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    },
    getHistory: (req, res) => {
      console.log(req.body)
      const userId = req.body.userId
      const offset = req.body.offset
      const limit = req.body.limit

      Payment.findAndCountAll({
        limit:parseInt(limit),
        // limit : 10,
        offset:offset,
        // subQuery: false,
          attributes : [
            'paymentType',
            'paymentSource',
            'nominal',
            'statusPayment',
            [sequelize.col('scholarship.judul'), 'judulScholarship'],
            [sequelize.col('project.name'), 'namaProject'],
            [sequelize.col('project.id'), 'projectId'],
            [sequelize.col('project.projectImage'), 'gambarProject'],
            [sequelize.col('scholarship.id'), 'scholarshipId'],
            [sequelize.col('scholarship->student.name'), 'namaMurid'],
            [sequelize.col('scholarship->student.studentImage'), 'fotoMurid'],
            'order_id',
            'komentar',
            'createdAt',
            'updatedAt',
            'id'
          ],
          where : {
              isRefund : 0,
              userId
          },
          include : [
            {
                model : Project,
                required : false,
                attributes : []
            },
            {
                model : scholarship,
                required : false,
                attributes : [],
                include : [
                    {
                        model : Student,
                        attributes : [],
                        required : true
                    }
                ]
            }
          ],
          order: [
              ['createdAt', 'DESC']
          ]
      }).then((result)=>{
        console.log('erresult')
        // console.log(result)
        console.log(result.count)
        
        return res.status(200).send({result : result.rows, count : result.count})
      }).catch((err)=>{
          console.log(err)
        return res.status(500).send({message : err})
      })
    },
    getHistoryAdmin: (req, res) => {
        // console.log(req.body)
        // const userId = req.body.userId
        // const offset = req.body.offset
        // const limit = req.body.limit
  
        Payment.findAndCountAll({
        //   limit:parseInt(limit),
        //   // limit : 10,
        //   offset:offset,
          // subQuery: false,
            attributes : [
              'paymentType',
              'paymentSource',
              'nominal',
              'statusPayment',
              [sequelize.col('scholarship.judul'), 'judulScholarship'],
              [sequelize.col('project.name'), 'namaProject'],
              [sequelize.col('project.id'), 'projectId'],
              [sequelize.col('project.projectImage'), 'gambarProject'],
              [sequelize.col('scholarship.id'), 'scholarshipId'],
              [sequelize.col('scholarship->student.name'), 'namaMurid'],
              [sequelize.col('scholarship->student.studentImage'), 'fotoMurid'],
              [sequelize.col('user.nama'), 'username'],
              'order_id',
              'komentar',
              'createdAt',
              'updatedAt',
              'id'
            ],
            where : {
                isRefund : 0,
                isDeleted : 0
            },
            include : [
              {
                  model : Project,
                  required : false,
                  attributes : []
              },
              {
                  model : User,
                  required : true,
                  attributes : [] 
              },
              {
                  model : scholarship,
                  required : false,
                  attributes : [],
                  include : [
                      {
                          model : Student,
                          attributes : [],
                          required : true
                      }
                  ]
              }
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        }).then((result)=>{
          console.log('erresult')
          // console.log(result)
          console.log(result.count)
          
          return res.status(200).send({result : result.rows, count : result.count})
        }).catch((err)=>{
            console.log(err)
          return res.status(500).send({message : err})
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
            return res.status(200).send(result)
        })
        .catch((err)=>{
            console.log(err)
            return res.status(500).send({ message : 'there is an error ' , err})
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
            return res.status(200).send(results)
        }).catch((error)=>{
            return res.status(500).send(error)
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
        console.log('--------------------------> masuk payout')
        // console.log(req.body)
        let {id} = req.query
        // console.log(id)
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
                    // console.log(ress.data)
                    let { reference_no } = ress.data.payouts[0]
                    // console.log(ress.data.payouts[0].reference_no)
                    // console.log( reference_no )
                    // --------> getPayout detail from midtrans and insert to db
                    
                    Axios({
                        headers: {
                          'Content-Type': 'application/json',
                          "Accept":"application/json",
                        },
                        method: 'post',
                        url: `https://app.sandbox.midtrans.com/iris/api/v1/payouts/${reference_no}`,
                        auth: {
                          username: 'IRIS-83f135ed-3513-47bf-81bb-a071822ee68f'
                        },
                        data: req.body
                        })
                        .then((resPayout)=>{
                                console.log(resPayout.data)
                                let {
                                    amount,
                                    beneficiary_name,
                                    beneficiary_account,
                                    bank,
                                    reference_no,
                                    notes,
                                    status,
                                    created_by
                                } = resPayout.data
                                

                                return res.status(200).send(resPayout.data)
            
                        }).catch((err)=>{
                            console.log(err)
                            return res.status(400).send(err)
                        })

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
            url: `https://app.sandbox.midtrans.com/iris/api/v1/account_validation?bank=${code}&account=${account}`,
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