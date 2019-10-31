const { Student, StudentDetail, StudentDetailRevision, School } = require('../models')
const fs = require('fs')
const { uploader } = require('../helpers/uploader')

module.exports = {
    getStudentDetail : (req,res) => {
        const { id } = req.params
        console.log('masuk detail')
        console.log(id)
            Student.findAll({
                where: {
                    id: id,
                },
                include: [
                    {
                        model: StudentDetail,
                        require: true,
                        // attributes: ['name']
                        // separate:true,
                        // where: {
                        //     dataStatus: 'Approved'
                        // },
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    },
                    {
                        model: School,
                        attributes: ['id',['nama', 'namaSekolah']]
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            })
            .then((results) => {
                console.log(results[0])
                return res.status(200).send(results);
            })
            .catch((err) => {
                console.log(err);
            })
    },
    addStudentDetail : (req,res) => {
        try { //kalo try ada error langsung masuk ke catch
            const path = '/student/images'; //file save path
            const upload = uploader(path, 'RPT').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
    
            upload(req, res, (err) => {
                if(err){
                    return res.status(500);
                }
                const { image } = req.files;
                const imagePath = image ? path + '/' + image[0].filename : null;
                const data = JSON.parse(req.body.data);
                data.imgPath = imagePath;

                const {
                    deskripsi, 
                    studentId, 
                    dataStatus,
                    kelas
                } = data

                console.log(data)

                StudentDetail.create({
                    pictureReport: imagePath,
                    deskripsi,
                    studentId,
                    dataStatus,
                    class: kelas
                })
                .then(() => {
                    StudentDetail.findAll({where: {studentId}})
                    .then((results) => {
                       return res.status(200).send(results);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                })
            })
        } catch(err) {
            return res.status(500);
        }
    },
    deleteStudentDetail : (req,res) => {
        var { id, studentId } = req.body
        StudentDetail.findAll({ where: {id} })
        .then((results) =>{
            var oldImgPath = results[0].dataValues.pictureReport
            fs.unlinkSync('./Public' + oldImgPath)
            StudentDetail.destroy(
                {where: { id }})
            .then(() => {
                StudentDetail.findAll({where: {studentId}})
                .then((results2) => {
                    res.send(results2);
                })
            })
        }).catch((err) => {
            console.log(err)
        })   
    },
    editStudentDetail : (req,res) => {
        try { //kalo try ada error langsung masuk ke catch
            const path = '/student/images'; //file save path
            const upload = uploader(path, 'RPT').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
    
            upload(req, res, (err) => {
                if(err){
                    return res.status(500);
                }
                const data = JSON.parse(req.body.data);
                const oldData = JSON.parse(req.body.oldData)

                console.log('----------------------------------------------------')
                console.log(oldData)
                
                const { image } = req.files;
                
                const imagePath = image ? path + '/' + image[0].filename : null; 
                
                // Data terbaru yang bakal disimpan ke Detail Student
                data.imgPath = imagePath;
                
                const {
                    id,
                    deskripsi, 
                    studentId, 
                    dataStatus,
                    kelas,
                    imgPath
                } = data
                

                // Data lama yang bakal dimasukkan ke dalam Detail Student Revisi
                const {
                    oldDeskripsi,
                    oldKelas,
                    oldPictureReport
                } = oldData

                delete data.image;

                if(!data.imgPath){
                    return StudentDetailRevision.create({
                        pictureReport: oldPictureReport,
                        deskripsi: oldDeskripsi,
                        class: oldKelas,
                        studentId,
                        detailId: id,
                        isDeleted: 0
                    })
                    .then(() => {
                        StudentDetail.update({
                            pictureReport: oldPictureReport,
                            deskripsi,
                            class: kelas,
                            dataStatus: dataStatus === 'Register Rejected' ? 'Unverified' : 'Update Unverified'
                        }, {
                            where: {
                                id,
                                studentId
                            }
                        })
                        .then((results) => {
                            return res.status(200).send(results)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }

                StudentDetailRevision.create({
                    pictureReport: oldPictureReport,
                    deskripsi: oldDeskripsi,
                    class: oldKelas,
                    studentId,
                    detailId: id,
                    isDeleted: 0
                })
                .then(() => {

                    StudentDetail.update({
                        pictureReport: imgPath,
                        deskripsi,
                        class: kelas,
                        dataStatus: dataStatus === 'Register Rejected' ? 'Unverified' : 'Update Unverified'
                    }, {
                        where: {
                            id,
                            studentId
                        }
                    })
                    .then((results) => {
                        return res.status(200).send(results)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })

                // StudentDetail.findAll({
                //     where: {
                //         id,
                //         studentId
                // }})
                // .then((results2) => {
                //     var oldImgPath = results2[0].dataValues.pictureReport
                //     console.log(oldImgPath)
                //     fs.unlinkSync('./Public' + oldImgPath)
                //     StudentDetail.update({
                //         deskripsi,
                //         pictureReport: imagePath
                //     }, { 
                //         where: {id}
                //      }).then(() => {
                //         StudentDetail.findAll({where: {studentId}})
                //         .then((results3) => {
                //             res.send(results3);
                //         })
                //     })
                    
                // })
            })
        } catch(err) {
            return res.status(500).send(err);
        }
        
    },
    getDetail:(req, res) => {
        // let {id} = req.params
        // console.log(id)
        // console.log(req.body)
        console.log('-----------------> masuk detail')

    }

}