const { Sequelize, sequelize, StudentRevision, School, Student } = require('../models')
const Op = Sequelize.Op
const Moment=require('moment')
const {uploader} = require('../helpers/uploader')
const fs = require('fs')

module.exports = {
    adminGetStudent : (req,res)=>{
        console.log('masuesk')
        var value = ''

        if(req.query.type === 'new'){
            value = 'Unverified'
        }else if(req.query.type === 'update'){
            value = 'Update Unverified'
        }

        Student.findAll({
            attributes:{
                exclude:['createdAt','updatedAt']
            },
            where:{
                isDeleted:0,
                dataStatus : value
            },
            include : [
                {
                    model : School,
                    attributes: 
                       [ 'bank', ['alamat','alamatSekolah'], 'namaPemilikRekening', 'nomorRekening', 'telepon', ['nama', 'schoolName']]
                }
            ]
        })
        .then((result)=>{
            return res.status(200).send(result)
        }).catch((err)=>{
            res.status(500).send({message:'error post', error:err})
        })
    },
    updateApprove : (req,res) =>{
        // body : {
        //     revid : 2,
        //     studentid : 1,

        // }
        console.log('updateee approve')
        console.log(req.body)
        return sequelize.transaction(function (t){
            return StudentRevision.update({
                isDeleted : 1
            }, {
                where : {
                    id : req.body.revid,
                    isDeleted : 0
                }
            },{ transaction : t })
            .then((result)=>{
                Student.update({
                    dataStatus : 'Approved'
                },{
                    where : {
                        id : req.body.studentid,
                    }
                }, {transaction : t})
                .then((result2)=>{
                    console.log('success update verified')
                  
                })
            })
        })
        .then((resultt)=>{
       
            return res.status(200).send({message : 'success update'})
        })
        .catch((errtrans)=>{
            return res.status(500).send({ message : 'admin error', error : errtrans.message})
        })
    },
    updateReject : (req,res)=>{
        // body : {
        //     revid : 2,
        //     studentid : 1,
        //     message : 'asdjaisdja'
        // }
        console.log('update reject')
        return sequelize.transaction(function (t){
            return StudentRevision.update({
                isDeleted : 1
            }, {
                where : {
                    id : req.body.revid,
                    isDeleted : 0
                }
            },{ transaction : t })
            .then((result)=>{
                Student.update({
                    dataStatus : 'Rejected',
                    statusNote : req.body.message
                },{
                    where : {
                        id : req.body.studentid
                    }
                }, {transaction : t})
                .then((result2)=>{
                    console.log('success update verified')
                  
                })
            })
        })
        .then((resultt)=>{
       
            return res.status(200).send({message : 'success update'})
        })
        .catch((errtrans)=>{
            return res.status(500).send({ message : 'admin error', error : errtrans.message})
        })
    },
    getStudentRevisions : async (req,res) =>{
        console.log('find revision')
        try {

            var result = await StudentRevision.findAll({
                attributes : {
                    exclude : ['createdAt', 'updatedAt']
                },
                where :{
                    studentId : req.params.id,
                    isDeleted : 0
                },
                include : [
                    {
                        model : School,
                        attributes: 
                           [ ['nama', 'schoolName']]
                    }
                ]
            })
            return res.status(200).send({ message : 'success get revision', result})
        }
        catch(err){
            return res.status(500).send({ message : 'error admin', err : err.message})
        }
    },

   
    postStudentRevision : (req,res) =>{
        const path = '/student/images'; //file save path
        const upload = uploader(path, 'STD').fields([{ name: 'image'}]); //uploader(path, 'default prefix')

        upload(req, res, (err) => {
            if(err){
                console.log("Masuk")
                return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
            }

            const { image } = req.files;
            console.log(image)
            const imagePath = image ? path + '/' + image[0].filename : null;
            console.log(imagePath)
      

            const data = JSON.parse(req.body.data);
         
  
            // need revision, udah bener ga kalau ga ganti gambar datanya masih ttp ada di studentrev
            console.log('---------changeimage---------------')
            console.log(data.result[1].changeImage)
            if(data.result[1].changeImage){
                data.result[1].studentImage = imagePath
            }else{
                data.result[1].studentImage = data.result[0].studentImage
            }
            console.log(data.result[0].studentImage)
            console.log(data.result[1].studentImage)
       
            // if(data.changeImage){
            //     fs.unlinkSync('./public' + data.oldimg);
            // }
           
            const {name,pendidikanTerakhir,gender,status,alamat,tanggalLahir,userId,story,schoolId,studentImage,studentId, dataStatus, provinsi}=data.result[0]
            console.log(name)
            return sequelize.transaction(function (t){
                return StudentRevision.create({
                    name:name,
                    pendidikanTerakhir:pendidikanTerakhir,
                    gender:gender,
                    status,
                    alamat,
                    provinsi,
                    tanggalLahir:Moment(tanggalLahir),
                    userId,
                    story,
                    schoolId,
                    studentImage,
                    studentId
                },{transaction:t})
                .then((result)=>{
                    console.log('insert student transaction success')
                    
                    const {pendidikanTerakhir, story, alamat, status, schoolId, id, studentImage} = data.result[1]
                    return Student.update({
                        pendidikanTerakhir,
                        story,
                        alamat,
                        status,
                        schoolId,
                        studentImage,
                        dataStatus : dataStatus === 'Register Rejected' ? 'Unverified' : 'Update Unverified'
                    }, {
                        where : {
                            id : id
                        }
                    }, {transaction : t}).then((result2)=>{
                        console.log('berhasuil')

                        // return res.status(200).send({message : 'success'})
                    }).catch((err)=>{
                        console.log('err1')
                        throw new Error();
                        // return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message })
                    })
            
                }).catch((err)=>{
                    console.log('err2')
                    throw new Error();
                    // return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message })
                })
            }).then((result)=>{
                console.log('masukmasuk,asuk')
                return res.status(200).send(result)
            }).catch((err)=>{
                console.log(err.message)
                return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message })
            })

        })
    
            
        
    },
    newStudentApprove : (req,res) =>{
        console.log('student approve')
        Student.update({
            dataStatus : 'Approved'
        }, {
            where : {
                id : req.params.id
            }
        })
        .then((result) => {
            return res.status(200).send({message : 'oke', result})
        })
        .catch((err)=>{
            console.log('asd')
            return res.status(500).send({message : err})
        })
    },
    newStudentReject : (req,res) =>{
        console.log('student reject')
        Student.update({
            dataStatus : 'Register Rejected',
            statusNote : `${req.body.text}`
        }, {
            where : {
                id : req.params.id
            }
        })
        .then((result) => {
            return res.status(200).send({message : 'oke', result})
        })
        .catch((err)=>{
            console.log('asd')
            return res.status(500).send({message : err})
        })
    },
    studentRejectRevert : async (req,res) =>{
        console.log('revert changes')

        try { 
            var result = await StudentRevision.findOne({
                attributes : {
                    exclude : ['createdAt, updatedAt']
                },
                where : {
                    studentId : req.params.id,
                    
                },
                order : [['createdAt', 'desc']]  // data terbaru
               
            })
            console.log(result.dataValues)
            var olddata = result.dataValues
    
            await Student.update({
                name : olddata.name,
                pendidikanTerakhir : olddata.pendidikanTerakhir,
                gender : olddata.gender,
                status : olddata.status,
                alamat : olddata.alamat,
                tanggalLahir : olddata.tanggalLahir,
                studentImage : olddata.studentImage,
                isDeleted : 0,
                story : olddata.story,
                schoolId : olddata.schoolId,
                dataStatus : 'Approved',
                statusNote : ''
            },{
                where : {
                    id : req.params.id
                }
            })
    
            console.log('berhasil update')
            res.status(200).send({message : 'Success Revert'})
        }
        catch(err){
            res.status(200).send({message : err})
        }
            
    }
}