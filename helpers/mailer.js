const nodemailer = require('nodemailer')
const fs=require('fs')
const handlebars=require('handlebars')

// Tergantung dari email yang ingin digunakan


module.exports = {
    emailer(to,subject,html,replacements,attachments){

        let email = 'operational@ngeles.co';
        let password = 'Op3rati0nal@ngeLes.c0;';
        // if (result) {
        //     email = result.defaultEmail;
        //     password = result.password;
        // }
        let transporter = nodemailer.createTransport({
            name : 'mail.ngeles.co',
            host : 'mail.ngeles.co',
            port: 465,
            // service: 'gmail',
            secure:true,
            auth: {
                // user: 'rezardiansyah1997@gmail.com', // ini ingat diganti kalo dicoba
                // pass: 'yzrztjnpnbapuukb'//
                user : email,
                pass : password
            },
            tls: {
                rejectUnauthorized: false
            },
            logger : true
        })
        // read and parse HTML template field
        console.log('email function')
        fs.readFile(html, {encoding: 'utf-8'}, (err, readHTML) => {
            if(err){
                console.log(err)
                return err
            }
            else{
                let template = handlebars.compile(readHTML);
                let htmlToSend = template(replacements);

                // setup email data with unicode symbols
                let mailOptions = {
                    from: email , // sender address
                    to: to, // 'mailnameh@domain.com', // list of receivers
                    subject: subject, // 'Hello ✔', // Subject line
                    html: htmlToSend || '', // html body
                    attachments: attachments ? attachments : null
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("emailer error", error.message)
                        // backUpTransporter.sendMail(mailOptions, (error, info) => {
                        //     if(error){
                        //         console.log("backup emailer error", error.message)
                        //         return false
                        //     }
                        //     console.log("email sent backup", info)
                        //     return true;
                        // })
                    }
                    console.log("email sent", info)
                    return true;
                });
            }
        })
    },
    // transporter : 
    // nodemailer.createTransport({
    //     service: 'gmail',
    //     secure:true,
    //     auth: {
    //         user: 'rezardiansyah1997@gmail.com',
    //         pass: 'yzrztjnpnbapuukb'
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     }
    // })

    transporter : 
    nodemailer.createTransport({
        name : 'mail.ngeles.co',
        host : 'mail.ngeles.co',
        port: 465,
        // service: 'gmail',
        secure:true,
        auth: {
            user: 'operational@ngeles.co',
            pass: 'Op3rati0nal@ngeLes.c0;'
        },
        tls: {
            rejectUnauthorized: false
        },
        logger : true
    })

    
    
};