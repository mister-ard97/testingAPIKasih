const { Sequelize, sequelize, Payment, Payout} = require('../models')
const Axios = require('axios')

module.exports = {
    payout:(req,res)=>{
        console.log('--------------------------> masuk payout')
        console.log(req.body)
        // let {id} = req.query
        console.log(req.query)
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
                    Axios({
                        headers: {
                          'Content-Type': 'application/json',
                          "Accept":"application/json",
                        },
                        method: 'get',
                        url: `https://app.sandbox.midtrans.com/iris/api/v1/payouts/${reference_no}`,
                        auth: {
                          username: 'IRIS-83f135ed-3513-47bf-81bb-a071822ee68f'
                        },
                        data: req.body
                        })
                        .then((resPayout)=>{
                                console.log('----------------------masuk payout detail')
                                console.log(resPayout.data)
                                let {
                                    amount,
                                    beneficiary_name,
                                    beneficiary_account,
                                    bank,
                                    reference_no,
                                    notes,
                                    beneficiary_email,
                                    status,
                                    created_by
                                } = resPayout.data

                                Payout.create({
                                    projectId: req.query.pId ,
                                    scholarshipId: req.query.sId,
                                    amount,
                                    beneficiary_name,
                                    beneficiary_account,
                                    bank,
                                    reference_no,
                                    notes,
                                    beneficiary_email,
                                    status,
                                    created_by
                                }).then((result) => {
                                    console.log('----------------------> masuk insert db')
                                    console.log(result)
                                }).catch((err) => {
                                    console.log(err)
                                })
                                
                                // return res.status(200).send(resPayout.data)
            
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
    getPayoutHistory:(req, res) => {
        console.log('---------------masuk get history payout')
        // let {status} = req.query
        let status = req.query.status ? req.query.status : null
        Payout.findAll({
            // attributes: {
            //     exclude : ['updateAt']
            // }
        }).then((result) => {
            console.log(result)
            return res.status(200).send(result)
        }).catch((err) => {
            return res.status(500).send(err)
        })
    },
    getPendingPayout: (req, res)=>{
        Payout.findAll({
            attributes: {
                exclude: ['updateAt']
            },
            where : {
                status : 'queued'
            }
        }).then((result)=>{
            console.log(result)
            return res.status(200).send(result)
        }).catch((err)=>{
            return res.status(500).send(err)
        })
    },
    approvePayment: (req, res) =>{
        console.log('---------------> masuk approve payment')   
        console.log(req.body)
        Axios({
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json",
                "Cache-Control": "no-cache"
            },
            method: 'post',
            url: `https://app.sandbox.midtrans.com/iris/api/v1/payouts/approve`,
            auth : {
                username: 'IRIS-2af5d46e-e0e0-493a-94b2-73142f8c7f33'
            },
            data: req.body
        })
        .then((res)=>{
            console.log(res.data)
            Payout.update({
                status : 'completed'
            },{
                where: {
                    reference_no: req.body.reference_nos[0]
                }
            }).then((result)=>{
                console.log('status updated')
            }).catch((err)=>{
                console.log(err)
            })
            return res.status(200).send(res.data)
        }).catch((err)=> {
            console.log(err.response.data)
            return res.status(500).send(err.response.data)
        })
    }

}