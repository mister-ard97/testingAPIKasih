
const { Sequelize, sequelize,  Student, School} = require('../models')
const Moment=require('moment')
const Op = Sequelize.Op
const {uploader}=require('../helpers/uploader')
const fs=require('fs')
module.exports={
    getStudentdata(req,res){
        Student.findAll({
            attributes:{
                exclude:['createdAt','updatedAt']
            },
            where:{
                isDeleted:0
            }
        })
        .then((result)=>{
            return res.status(200).send(result)
        }).catch((err)=>{
            res.status(500).send({message:'error post', error:err})
        })
    },
    postStudentdata(req,res){
        try {
            const path = '/student/images'; //file save path
            const upload = uploader(path, 'STD').fields([{ name: 'image'}]);
            upload(req,res,(err)=>{
                if(err){
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }
                const {image}=req.files;
                console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                console.log(imagePath)
                const data = JSON.parse(req.body.data);
                console.log(data)
                data.studentImage=imagePath
                // data.tanggalLahir=Moment(data.tanggalLahir)
                const {name,pendidikanTerakhir,gender,status,alamat,tanggalLahir,userId,story,schoolId,studentImage}=data
                console.log(name)
                return sequelize.transaction(function (t){
                    return Student.create({
                        name:name,
                        pendidikanTerakhir:pendidikanTerakhir,
                        gender:gender,
                        status,
                        alamat,
                        tanggalLahir:Moment(tanggalLahir),
                        userId,
                        story,
                        schoolId,
                        studentImage,
                        dataStatus : 'Unverified'
                    },{transaction:t})
                    .then((result)=>{
                        return result
                    }).catch((err)=>{
                        console.log(err.message)
                        fs.unlinkSync('./public' + imagePath);
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message })
                    })
                }).then((result)=>{
                    console.log('success upload')
                    Student.findAll({
                        attributes:{
                            exclude:['createdAt','updatedAt']
                        },
                        where:{
                            isDeleted:0
                        }
                    })
                    .then((result1)=>{
                        return res.status(200).send(result1)
                    }).catch((err)=>{
                        res.status(500).send({message:'error post', error:err})
                    })
                    // return res.status(200).send(result)
                }).catch((err)=>{
                    console.log(err.message)
                    fs.unlinkSync('./public' + imagePath);
                    return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message })
                })
            })
            
        } catch (error) {
            console.log(err.message)
            fs.unlinkSync('./public' + imagePath);
            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
        }
    },
    putStudentdata(req,res){
        const {id}=req.params
        console.log(id)
        Student.findAll(
            {
                where:{
                    id:id
                }
            }
        )
        .then((result)=>{
            if(result.length>0){
                console.log(result[0].studentImage)
                const path = '/student/images'; //file save path
                const upload = uploader(path, 'STD').fields([{ name: 'image'}]);
                upload(req,res,(err)=>{
                    if(err){
                        return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                    }
                    const { image } = req.files;
                    // console.log(image)
                    const imagePath = image ? path + '/' + image[0].filename : null;
                    const data = JSON.parse(req.body.data);
                    console.log(imagePath)
                    try {
                        if(imagePath) {
                            data.studentImage = imagePath;
                        }
                        if(data.tanggalLahir){
                            data.tanggalLahir=Moment(data.tanggalLahir)
                        }
                        // const {name,pendidikanTerakhir,gender,status,alamat,tanggalLahir,userId,story,sekolah,studentImage}=data
                        Student.update(data,{
                            where:{
                                id:id
                            }
                        }).then((result2)=>{
                            if(imagePath) {
                                console.log('masuk')
                                fs.unlinkSync('./public' + result[0].studentImage);
                            }
                            // Student.findAll(
                            //     {
                            //         attributes:{
                            //             exclude:['createdAt','updatedAt']
                            //         },
                            //         where:{
                            //             isDeleted:0
                            //         }
                            
                            //     }
                            // )
                            // .then((result1)=>{
                            //     console.log('berhasil')
                            return res.status(200).send(result2)
                            // }).catch((err)=>{
                            //     return res.status(500).send({message:'error post', error:err})
                            // })
                            // return res.status(200).send(result1)
                        }).catch((err)=>{
                            if(imagePath) {
                                fs.unlinkSync('./public' + imagePath);
                            }
                            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
                        })
                    } catch (error) {
                        console.log(err.message)
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                })
            }
        }).catch((err)=>{
            throw err;
        })
    },
    deleteStudentdata(req,res){
        const {id}=req.params
        Student.update({
            isDeleted:1
        },{
            where:{
                id:id
            }
        }).then((result)=>{
          
            return res.status(200).send(result)
          
        }).catch((err)=>{
            return res.status(500).send({message:'error post', error:err})
        })
    },
    getStudentdatapaging(req,res){ // DUPLIKAT FUNCTION INI UNTUK HOME ( TAPI GA ADA FILTERING BERDASARKAN ID )
        console.log('masukdatapaging')
        console.log(req.body)
        console.log(req.user)

        var { page, limit, sekolah,  pendidikan} = req.body;
        var listpendidikan = ['SMA', 'SMK', 'S1', 'SD', 'SMP', 'TK']
   
        var offset=(page*limit)-limit
        Student.findAndCountAll({
            // limit:parseInt(limit),
            // offset:offset,
            // order:[['id','asc']],
            attributes:{
                exclude:['createdAt','updatedAt']
            },
            include : [
                {
                    model : School,
                    required : true,
                    attributes : [['nama', 'schoolName']],
                    where : {
                        nama : {
                            [Op.like] : `%${sekolah ? sekolah : ''}%`
                        },
                  
                    },
               
                }
            ],
            where : {
                // userId,
                isDeleted : 0
            }
            // where:{
            //     isDeleted:0,
            //     // pendidikanTerakhir : {
            //     //     [Op.in] : pendidikan ? pendidikan : listpendidikan
            //     // },
            //     userId : req.user.userId
            //     // [School.nama] : `%${sekolah ? sekolah : ''}%`
            // }
        })
        .then((result)=>{
            console.log('======> hasilnya')
            console.log(result)
            return res.status(200).send(result)
        }).catch((err)=>{
            return res.status(500).send({message:'error post', error:err})
        })
    },
    getStudentPerUser : (req, res) => {
        console.log('masuk sini')
        // const {userId} = req.body
        // console.log(req.query)
        Student.findAll({
            attributes: [
                'id',
                'name',
                'pendidikanTerakhir',
            ],
            where : {
                userId: req.query.id,
                isDeleted: 0
            }
        })
        .then((result) => {
            console.log(result)
            return res.send(result)
        }).catch((err)=>{
            console.log(err)
        })
    }


}
