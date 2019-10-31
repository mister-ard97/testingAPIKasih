const { Sequelize, sequelize, StudentRevision, School, Student, StudentDetail, StudentDetailRevision } = require('../models')
const Op = Sequelize.Op
const Moment=require('moment')
const {uploader} = require('../helpers/uploader')
const fs = require('fs')

module.exports = {
    getStudentUnverified: (req, res) => {
        let value;
        if(req.query.type == 'new'){
            value = 'Unverified'
        }else if(req.query.type == 'update'){
            value = 'Update Unverified'
        }

        // console.log('-------------------------------------------------------------------')
        // console.log(value)

        Student.findAll({
            where : {
                userId: req.user.userId,
                dataStatus: 'Approved'
            },
            include : [
                {
                    model: StudentDetail,
                    require: true,
                    // attributes: ['name']
                    // separate:true,
                    where : {
                        dataStatus: value
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'deskripsi', 'id', 'class', 'pictureReport', 'studentId']
                    }
                },
                {
                    model : School,
                    attributes: 
                       [['nama', 'schoolName']]
                }
            ],
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        .then((results) => {
            console.log(results)
            return res.status(200).send(results);
        })
        .catch((err) => {
            console.log(err);
        }) 
    },


    getStudentDetailUnverified: (req, res) => {
        const { id } = req.params
        let value;
        if(req.query.type == 'new'){
            value = 'Unverified'
        }else if(req.query.type == 'update'){
            value = 'Update Unverified'
        }

        Student.findAll({
            where: {
                id: id,
                userId: req.user.userId,
                dataStatus: 'Approved'
            },
            include: [
                {
                    model: StudentDetail,
                    require: true,
                    // attributes: ['name']
                    // separate:true,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    where: {
                        dataStatus: value
                    }
                }
            ],
            attributes: {
                exclude: [
                    'createdAt', 
                    'updatedAt', 
                    'sekolah', 
                    'alamat',
                    'dataStatus',
                    'gender',
                    'isDeleted',
                    'gender',
                    'pendidikanTerakhir',
                    'schoolId',
                    'status',
                    'statusNote',
                    'story',
                    'studentImage',
                    'tanggalLahir',
                    'userId'
                ]
            }
        })
        .then((results) => {
            console.log(results)
            return res.status(200).send(results);
        })
        .catch((err) => {
            console.log(err);
        })
    },

    postStudentDetailApprove: (req, res) => {
        const {id} = req.params

        StudentDetail.update({
            dataStatus: 'Approved'
        }, {
            where: {
                id: id
            }
        })
        .then((results) => {
            console.log(results)
            return res.status(200).send(results)
        })
        .catch((err) => {
            return res.status(500).send({message:'error post', error:err})
        })
    },

    postStudentDetailRejected: (req, res) => {
        console.log(req.body)
        StudentDetail.update({
            dataStatus: 'Register Rejected',
            statusNote: req.body.text
        }, {
            where: {
                id: req.body.id
            }
        })
        .then((results) => {
            console.log(results)
            return res.status(200).send(results)
        })
        .catch((err) => {
            return res.status(500).send({message:'error post', error:err})
        })
    },

    getStudentDetailRevision: (req, res) => {
        const { id } = req.params
        StudentDetailRevision.findAll({
            where: {
                detailId: id,
                isDeleted: 0
            }
        })
        .then((results) => {
            return res.status(200).send(results)
        })
        .catch((err) => {
            console.log(err)
        })
    },

    approveUpdateDetailRevision: (req, res) => {
        console.log('Update Approved');
        console.log(req.body.data)
        // req.body.data =  { idrev dari studentRevision,  idstudentdetail, idstudent}

        return sequelize.transaction( function (t) {
            return StudentDetailRevision.update({
                isDeleted: 1,
            }, {
                where: {
                    id: req.body.data.idrev,
                    detailId: req.body.data.detailId
                }
            }, {transaction: t})
            .then((result) => {
                StudentDetail.update({
                    dataStatus: 'Approved'
                }, {
                    where: {
                        id: req.body.data.idStudentDetail
                    }
                }, {transaction: t})
                .then((results2) => {
                    console.log('success update detail')
                })
            })
        })
        .then((lastResults) => {
            console.log(lastResults)
            return res.status(200).send({message: 'Success Update'})
        })
        .catch((err) => {
            return res.status(500).send({message: 'db error', error: err.message})
        })
    },

    rejectUpdateDetailRevision: (req, res) => {
        console.log('Reject Approved');
        // req.body.data =  { idrev dari studentRevision,  idstudentdetail, idstudent}

        return sequelize.transaction(function (t) {
            return StudentDetailRevision.update({
                isDeleted: 1,
            }, {
                where: {
                    id: req.body.data.idrev,
                    detailId: req.body.data.detailId,
                    isDeleted: 0
                }
            }, { transaction: t })
                .then((result) => {
                    StudentDetail.update({
                        dataStatus: 'Rejected',
                        statusNote: req.body.data.statusNote
                    }, {
                        where: {
                            id: req.body.data.idStudentDetail
                        }
                    }, { transaction: t })
                        .then((results2) => {
                            console.log('success update detail')
                        })
                })
        })
            .then((lastResults) => {
                console.log(lastResults)
                return res.status(200).send({ message: 'Success Update' })
            })
            .catch((err) => {
                return res.status(500).send({ message: 'db error', error: err.message })
            })
    },

    detailRevertChange: (req, res) => {
        const { id } = req.params

        StudentDetailRevision.findOne({
            attributes: {
                exclude: ['createdAt, updatedAt']
            },
            where: {
                detailId: id
            },
            order: [['createdAt', 'desc']]
        })
        .then((results) => {
            var oldData = results.dataValues

            StudentDetail.update({
                pictureReport: oldData.pictureReport,
                class: oldData.kelas,
                deskripsi: oldData.deskripsi,
                dataStatus: 'Approved',
                statusNote: ''
            }, {
                where: {
                    id
                }
            })
            .then((results2) => {
                return res.status(200).send({message: 'Success Revert'})
            })
        })
        .catch((err) => {
           return res.status(200).send({ message: err })
        })
    }
}