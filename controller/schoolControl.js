// const { Sequelize, sequelize, School} = require('../models')
// const Op = Sequelize.Op

// module.exports = {
//     getSchool : (req, res) => {
//         School.findAll({
//             attributes:{
//                 exclude : ['createdAt', 'updatedAt']
//             },
//                 where : {
//                     isDeleted : 0
//                 }
//         })
//         .then((result)=>{
//             // console.log(result)
//             return res.status(200).send(result)
//         }).catch((err)=>{
//             return res.status(500).send({message: 'error', error: err})
//         })
//     },
//     getSelectedSchool: (req, res) => {
//         console.log('--------------->')
//         const {id} = req.query
//         let kondisi = `where : { ${id} }`
//         School.findAll({
//             attributes: {
//                 exclude: ['createdAt', 'updatedAt']
//             },
//             where: {
//                 id
//             }
//         }).then((result)=>{
//             console.log(result)
//             return res.status(200).send(result)
//         }).catch((err)=>{
//             console.log(err)
//             return res.status(500).send(err)
//         })
//     },
//     addSchool : (req, res) => {
//         const {nama, alamat, telepon, namaPemilikRekening, nomorRekening, bank, email} = req.body
//         School.create({
//             nama,
//             alamat,
//             telepon,
//             namaPemilikRekening,
//             nomorRekening,
//             bank,
//             email
//         }).then((result) => {
//             return res.status(200).send(result)
//         }).catch((err) => {
//             return res.status(200).send(err.message)
//         })
//     },
//     putSchool : (req,res) => {
//         const {id} = req.query
//         const {nama, alamat, telepon, namaPemilikRekening, nomorRekening, bank, email} = req.body
//         School.update({
//             nama,
//             alamat,
//             telepon,
//             namaPemilikRekening,
//             nomorRekening,
//             bank,
//             email,
//             isVerified: '0'
//         },{
//             where : {
//                 id
//             }
//         })
//         .then((result) => {
//             return res.status(200).send(result)
//         }).catch((err) => {
//             return res.status(500).send(err)
//         })
//     },
//     verifiedSchool : (req, res) => {
//         const {id} = req.query
//         console.log(id)
//         School.update({
//             isVerified: '1'
//         },{
//             where: {
//                 id
//             }
//         })
//         .then((result) => {
//             return res.status(200).send(result)
//         }).catch((err) => {
//             return res.status(500).send(err)
//         })
//     },
//     deleteSchool : (req, res) => {
//         console.log('---------------------> masuk delete school')
//         const {id} = req.query
//         School.update({
//             isDeleted: '1'
//         }, {
//             where: {
//                 id
//             }
//         })
//         .then((result) => {
//             return res.status(200).send(result)
//         }).catch((err) => {
//             return res.status(500).send(err)
//         })
//     },

//     getSelectedSchool : (req, res) => {
//         const { id } = req.query
//         console.log(id)
//         School.findOne({
//             attributes:{
//                 exclude : ['createAt', 'updateAt']
//             },
//                 where : {
//                     id,
//                     isDeleted : 0
//                 }
//         })
//         .then((result)=>{
//             // console.log(result.dataValues)
//             return res.status(200).send(result.dataValues)
//         }).catch((err)=>{
//             return res.status(500).send({message: 'error', error: err})
//         })
//     }
// }
