const { Sequelize, sequelize, School} = require('../models')
const Op = Sequelize.Op

module.exports = {
    getSchool : (req, res) => {
        School.findAll({
            attributes:{
                exclude : ['createAt', 'updateAt']
            },
                where : {
                    isDeleted : 0
                }
        })
        .then((result)=>{
            // console.log(result)
            return res.status(200).send(result)
        }).catch((err)=>{
            return res.status(500).send({message: 'error', error: err})
        })
    },
    addSchool : (req, res) => {
        const {nama, alamat, telepon, namaPemilikRekening, nomorRekening, bank, email} = req.body
        School.create({
            nama,
            alamat,
            telepon,
            namaPemilikRekening,
            nomorRekening,
            bank,
            email
        }).then((result) => {
            return res.status(200).send(result)
        }).catch((err) => {
            return res.status(200).send(err.message)
        })
    },
    putSchool : (req,res) => {
        const {id} = req.query
        const {nama, alamat, telepon, namaPemilikRekening, nomorRekening, bank, email} = req.body
        School.update({
            nama,
            alamat,
            telepon,
            namaPemilikRekening,
            nomorRekening,
            bank,
            email,
            isVerified: '0'
        },{
            where : {
                id
            }
        })
        .then((result) => {
            return res.status(200).send(result)
        }).catch((err) => {
            return res.status(500).send(err)
        })
    },
    verifiedSchool : (req, res) => {
        const {id} = req.query
        console.log(id)
        School.update({
            isVerified: '1'
        },{
            where: {
                id
            }
        })
        .then((result) => {
            return res.status(200).send(result)
        }).catch((err) => {
            return res.status(500).send(err)
        })
    },
    deleteSchool : (req, res) => {
        console.log('---------------------> masuk delete school')
        const {id} = req.query
        School.update({
            isDeleted: '1'
        }, {
            where: {
                id
            }
        })
        .then((result) => {
            return res.status(200).send(result)
        }).catch((err) => {
            return res.status(500).send(err)
        })
    }
}