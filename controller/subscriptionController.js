
const { User, Sequelize, sequelize, School, Project, Payment, Subscription } = require('../models');
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

    }
}