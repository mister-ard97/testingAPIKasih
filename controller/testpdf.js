const path=require('path')
const fs =require('fs')
const {emailer}=require('../helpers/mailer')
const {pdfcreate}=require('../helpers/pdfcreate')
const {Student}=require('./../models')
const moment=require('moment')


const createPaymentReceiptPdf = async (payment, cb) => {
    // let paymentObj = JSON.parse(JSON.stringify(payment)) //Forces get of Datavalues
    try{ 
        const replacements = {
            PaymentReceiptNumber: 090496,
            PaymentReceiptDate: moment('20190208').format("DD MMMM YYYY"),
            PaymentMethod: 'dadasd',
            FullName: `${'dino'} ${'rahman'}`,
            InvoiceNumber: 012334556,
            Description: ['dsadasda','dadasdasda'],
            PayTo: `${'dino'} An. ${'rahman'}`,
            NumberDetails: 123456,
            Nominal: '100000'.toLocaleString(),

            logo: 'file:///' +  path.resolve('./emails') + '/supports/logowithtext.png',
            instagramlogo: 'file:///' +  path.resolve('./emails') + '/supports/instagram_icon.png',
            facebooklogo: 'file:///' +  path.resolve('./emails') + '/supports/facebook_icon.png',
            twitterlogo: 'file:///' +  path.resolve('./emails') + '/supports/twitter_icon.png',
            youtubelogo: 'file:///' +  path.resolve('./emails') + '/supports/youtube_icon.png',
        }

        const options = { 
            format: 'A5', 
            orientation: "landscape",
            border : {
                top: "0.5in",
                left: "0.5in",
                right: "0.5in",
                bottom: "0.5in"
            }
        }
        
        await pdfcreate("./emails/PaymentReceipt.html", replacements, options, cb)
    }
    catch(err){
        console.log(err)
    }
}

const paymentReceiptMailer = async (payment, PDF_STREAM) => {
    // let paymentObj = JSON.parse(JSON.stringify(payment)) //Forces get of Datavalues
    try{
        // const { transaction, voucher } = paymentObj
        // const { programSales, subscriptionSales, serviceSales } = transaction
        console.log(payment)
        var email = payment

        let subject = "Payment Receipt kasihnusantara"
        let InvoiceNumber =012334556
        let NumberDetails = `ACC: ${12345} - ${12333}` //nomr bisa diganti
        let Description = ['dadsasd','dadadasd']



        let emailReplacements = {
            PaymentReceiptNumber: 090496,
            PaymentReceiptDate: moment('20190208').format("DD MMMM YYYY"),
            PaymentMethod: 'dadasd',
            FullName: `${'dino'} ${'dadasda'}`,
            InvoiceNumber: InvoiceNumber,
            Description: Description,
            PayTo: `${'dino'} An. ${'rahman'}`,
            NumberDetails: NumberDetails,
            Nominal: '100000'.toLocaleString(),
        }

        let attachments = [
            {
                filename: 'logo.png',
                path: './emails/supports/logo.png',
                cid: 'logo'
            },
            {
                filename: 'instagram.png',
                path: './emails/supports/instagram.png',
                cid: 'instagramlogo'
            },
            {
                filename: 'facebook.png',
                path: './emails/supports/facebook.png',
                cid: 'facebooklogo'
            },
            {
                filename: 'youtube.png',
                path: './emails/supports/youtube.png',
                cid: 'youtubelogo'
            },
            {
                filename: 'twitter_icon.png',
                path: './emails/supports/twitter_icon.png',
                cid: 'twitterlogo'
            },
            {
                filename: `paymentreceipt.pdf`,
                content: PDF_STREAM
            }
        ]  
        console.log(email)
        console.log('asuhdaushduahsduahsduahsduahsdush')
        await emailer(email, subject, "./emails/PaymentReceiptEmail.html", emailReplacements, attachments)
    }
    catch(err){
        console.log(err)
    }
}
module.exports={
    getemail(req,res){
        console.log('req is '+ req)
        Student.findAll()
        .then(async  (result) => {
            //Send payment receipt email. May fail even if payment is confirmed.
            try{
                await createPaymentReceiptPdf(req, async (PDF_STREAM) => {
                    await paymentReceiptMailer(req, PDF_STREAM)
                    // return res.status(200).send(result)
                })
            }
            catch(err){
                console.log("Email payment receipt error: ", err)
                return err
            }
        })
    }
}
