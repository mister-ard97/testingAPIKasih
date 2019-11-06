
const { User, Sequelize, sequelize, School, Project, Payment, Subscription, scholarship, Student } = require('../models');
const Op = Sequelize.Op
const Crypto = require('crypto');



const { uploader } = require('../helpers/uploader');
const { createJWTToken, createForgotPasswordToken } = require('../helpers/jwtoken');
const { transporter } = require('../helpers/mailer')
const  testcontroller  = require('./testpdf')

// FOR EMAILER
const path=require('path')
const fs =require('fs')
const {emailer}=require('../helpers/mailer')
const {pdfcreate}=require('../helpers/pdfcreate')

const moment=require('moment')


const midtransClient                                    = require('midtrans-client')
const snap = new midtransClient.Snap({
    isProduction    : false,
    serverKey       : 'SB-Mid-server-Dr8HK_lJ4cuEZi4rUgNcsDUR',
    clientKey       : 'SB-Mid-client-Ttge99xVU4AOz44T'
})


module.exports = {
    userSubscribe :  (req,res) =>{
        // console.log(req.body)
        // const { scholarshipId, userId, nominalSubscription, remainderDate, monthLeft } = req.body
        const { parameter, userData } = req.body
        console.log(parameter)
        // console.log(userData) 
        const { gross_amount } = parameter.transaction_details
        const nominalSubscription = gross_amount
        const { userId, scholarshipId, remainderDate, monthLeft } = userData

        
        // Subscription.create({
        //     scholarshipId,
        //     userId,
        //     nominalSubscription,
        //     remainderDate,
        //     monthLeft
        // }).then((results)=>{
        //     console.log('success insert ')
        //     return res.status(200).send(results);


        // }).catch((err)=>{
        //     return res.status(500).send(err);
        // })  



        snap.createTransaction(parameter)
        .then((transaction)=>{
            transactionToken = transaction.token;
            console.log('transactionToken: ', transactionToken)

            // INSERT DATABASE 
            Subscription.create({
                scholarshipId,
                userId,
                nominalSubscription,
                remainderDate,
                monthLeft
            }).then((result)=>{
                console.log('asudhauishd')
                
                return res.status(200).send({transactionToken, order_id: parameter.transaction_details.order_id})


            
            }).catch((err)=>{
                console.log(err)
                return res.status(500).send(err)
            })
           
        })   

    },
    getUserSubscriptionList : (req,res) =>{
        const userId = req.params.id

        scholarship.findAll({
            attributes : {
                exclude : [
                    'createdAt', 'updatedAt', 'nominal'
                ],
                include : [

                    [sequelize.col("Subscriptions.id"), "subsId"],
                    [sequelize.col("Subscriptions.monthLeft"), "subsMonthLeft"],
                    [sequelize.col("Subscriptions.nominalSubscription"), "userSubs"],
                    [sequelize.col("Subscriptions.remainderDate"), "Date"],
                    [sequelize.fn('datediff', sequelize.col('scholarshipEnded') ,  sequelize.col('scholarshipStart')), 'SisaHari'],
                    [sequelize.col("Student.name"), "namaMurid"],
                    [sequelize.col("Student.studentImage"), "studentImage"],
                    [sequelize.col("School.nama"), "namaSekolah"],
                    ['nominal', 'targetScholarship']

                ]
            },
            include : [
                {
                    model : Subscription,
                    require : true,
                    attributes : [],
                    where : {
                        userId,
                        isCancelled : 0
                    }
    
                },
                {
                    model : School,
                    attributes : []
                },
                {
                    model : Student,
                    attributes : []
                },

            ]
          
        })

        .then(async (result) => {
            console.log('------------------------------------then')

            var hasil = result.map((val)=>{
                return val.dataValues
            })
            var listScholarId = hasil.map((val)=>{
                return val.id
            })

           var res2 = await  Subscription.findAll({
                attributes : [
                    [sequelize.fn('SUM', sequelize.col('nominalSubscription')), 'currentSubs']
                ],
        
                where : {
                    scholarshipId  : {
                        [Op.in] : listScholarId
                    }
                },
                group : ['scholarshipId']
            })

            var res3 = await Payment.findAll({
                attributes : [
                    'scholarshipId',
                    [sequelize.fn('SUM', sequelize.col('nominal')), 'currentDonation']
                ],
                where : {
                    scholarshipId  : {
                        [Op.in] : listScholarId
                    }
                },
                group : ['id']
            })

            // KALAU ADA YANG TAU CARA BIKIN INI SEMUA DALAM SEKALI SEQUELIZE TOLONG DIUBAH YA :)

            var subsScholar = res2.map((val)=>{
                console.log(val)
                return val.dataValues.currentSubs
            })
            var paymentDonations = res3.map((val)=>{
                return [val.dataValues.scholarshipId ,val.dataValues.currentDonation]
            })
            console.log(subsScholar)
            console.log(paymentDonations)

            for(var i = 0 ; i < hasil.length; i++){
                hasil[i].currentSubs = parseInt(subsScholar[i])
                var totaldonation = 0
                for(var y = 0 ; y < paymentDonations.length ; y++){
                    if(paymentDonations[y][0] === hasil[i].id){
                        totaldonation = totaldonation + parseInt(paymentDonations[y][1])
                    }
                }
                hasil[i].totaldonation = totaldonation
            }

            console.log(hasil)

                // console.log(hasil)
                
            return res.status(200).send({message : 'success get', result : hasil})

            
            // .catch((err)=>{
            //     console.log(err)
            //     return res.status(500).send({message: err})

            // })
            


            // return res.status(200).send(result)
        }).catch((err)=>{
            console.log(err)
            return res.status(500).send({message: err})
        })
    },
    cancelSubscription : async (req,res) =>{
        const {id} = req.body
        try{

            await Subscription.update({
                cancelledDate : new Date(),
                isCancelled : 1
            }, {
                where : {
                    id 
                }
            })

            res.status(200).send({message : 'success update'})
        }
        catch (err){
            console.log(err)
            res.status(500).send(err)
        }
    }
}