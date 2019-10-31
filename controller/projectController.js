const { Sequelize, sequelize, User, Project, Payment } = require('../models')
const Op = Sequelize.Op
const {uploader} = require('../helpers/uploader')
const fs = require('fs')



module.exports = {
    postProject : (req,res) =>{
        console.log('masuk1')

        const path = '/post/image/project'; //file save path
        const upload = uploader(path, 'PJT').fields([{ name: 'image'}]); //uploader(path, 'default prefix')

        upload(req, res, (err) => {

            if(err){
                console.log('masuk2')

                return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
            }

            console.log('Nama Y')
            const { image } = req.files;
            // console.log(image)
            const imagePath = image ? path + '/' + image[0].filename : '/defaultPhoto/defaultCategory.png';
            // console.log(imagePath)

            // console.log(req.body.data)
            const data = JSON.parse(req.body.data);
            
            // console.log(data.shareDescription)
            console.log(data)

            sequelize.transaction(function(t){
                return (
                    Project.create({
                        name: data.name,
                        description : data.description,
                        totalTarget: data.totalTarget,
                        projectCreated : data.projectCreated,
                        projectEnded : data.projectEnded,
                        projectImage : imagePath,
                        shareDescription: data.shareDescription,
                        userId : req.user.userId

                    }, { transaction : t})
                    .then((result) => {
                        return res.status(200).send({message : 'oke', result})
                    })
                    .catch((err)=>{
                        return res.status(500).send({message : err})
                    })
                )}
            )




        })
    },
    getProject : (req,res) =>{
        //tambahin where untuk rolenya adalah USER ADMIN dan didapat dari props dan idnya bisa dikirim lwt body atau
        // bisa dari token juga (req.user.userId)

        // console.log('masik')
        var { page, limit, sortMethod} = req.query;
        if(!sortMethod){
            sortMethod='ASC'
        }
        var offset=(page*limit)-limit

      
        Project.findAll({
            limit:parseInt(limit),
            offset:offset,
            order:[['id',sortMethod]],
            attributes : [
                ["name", "projectName"],
                ["id", "projectId"],
                "description",
                "projectCreated",
                "projectEnded",
                "totalTarget",
                "projectImage",
                [sequelize.fn('datediff', sequelize.col('projectEnded') ,  sequelize.fn("NOW")), 'SisaHari']
            ],
            

            where : {
                isDeleted : 0
            },
            include : [{
                model : User,
                attributes : [
                    ["nama", "projectCreator"]
                ],
                where : {
                    id: req.user.userId,
                    role: 'User Admin'
                }
            }]

        })
        .then((result)=>{
            Project.count(
                {where : {
                    isDeleted : 0
                }}
            ).then((resultdua) => {
                var total = resultdua
                

                return res.status(200).send({message : 'success get projects', result, total})
            })
            .catch((err)=>{
                return res.status(500).send({message : err})
            })
            // console.log('aishdiashdiashd')
            // console.log(a)
            // return res.status(200).send({message : 'success get projects', result})
        })
        .catch((err)=>{
            return res.status(500).send({message : err})
        })

    },
    getAllProject : (req,res) =>{
        var { page, limit} = req.query;

        var offset=(page*limit)-limit
        sequelize.transaction(function(t){
            return (
                Project.findAll({
                    limit:parseInt(limit),
                    offset:offset,
                    order:[['id', 'asc']],
                    attributes : [
                        ["name", "projectName"],
                        ["id", "projectId"],
                        "description",
                        "projectCreated",
                        "projectEnded",
                        "totalTarget",
                        "projectImage",
                        [sequelize.fn('datediff', sequelize.col('projectEnded') ,  sequelize.fn("NOW")), 'SisaHari']
                    ],
                    where : {
                        isDeleted : 0,
                    },
                    include : [{
                        model : User,
                        attributes : [
                            ["nama", "projectCreator"]
                        ]
                    }]

                })
                .then((result)=>{
                    Project.count(
                        {where : {
                            isDeleted : 0
                        }}
                    ).then((resultdua) => {
                        var total = resultdua
                        console.log(result.length)
                        

                        return res.status(200).send({message : 'success get projects', result, total})
                    })
                })
                .catch((err)=>{
                    return res.status(500).send({message : err})
                })
            )
        })
    },
    editProject : (req,res) =>{
        // console.log(req.params.id)
        const path = '/post/image/project'; //file save path
        const upload = uploader(path, 'PJT').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
        upload(req, res, (err) => {
            if(err){
                console.log("Masuk")
                return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
            }
            
            const { image } = req.files;
            // console.log(image)
            const imagePath = image ? path + '/' + image[0].filename : null;
            // console.log(imagePath)
            
            // console.log(req.body.data)
            const data = JSON.parse(req.body.data);
            // console.log(data)
            if(data.changeImage){
                fs.unlinkSync('./public' + data.oldimg);
            }
            // console.log('test')

            Project.update({
                name: data.name,
                description : data.description,
                totalTarget: parseInt(data.totalTarget),
                projectEnded : data.projectEnded,
                projectImage : data.changeImage ? imagePath : data.oldimg,
            }, {
                where : {
                    id : req.params.id
                }
            })
            .then((result) => {
                return res.status(200).send({message : 'oke', result})
            })
            .catch((err)=>{
                // console.log('asd')
                return res.status(500).send({message : err})
            })
        })


        // sequelize.transaction(function(t){
        
        // })
    },
    deleteProject : (req,res) =>{
        var id = req.params.id
        Project.findOne({
            attributes : [
                'projectImage'
            ],
            where : {
                id : id
            }
        }).then((result)=>{
            // console.log(result.projectImage)

            //DELETE IMAGE
            if(result.projectImage){
                fs.unlinkSync('./public' + result.projectImage);
            }

            Project.update({
                isDeleted : 1
            }, {where : { id : id}})
            .then((result2)=>{
                return res.status(200).send({message : 'success', result : result2})
            })
            .catch((err)=>{
                return res.status(500).send({message : err})
            })


        })
        .catch((err)=>{
            return res.status(500).send({message : err})
        })
    },

    getDetailProject: (req, res) => {
        Project.findAll({
            attributes : [
                ["name", "projectName"],
                ["id", "projectId"],
                "description",
                "projectCreated",
                "projectEnded",
                "totalTarget",
                "projectImage",
                "shareDescription"
            ],

            where: {
                id: req.query.id,
                isDeleted: 0
            },

            include : [{
                model : User,
                attributes : [
                    ["nama", "projectCreator"]
                ]
            }]
        })
        .then((results) => {
            // console.log(results)
            return res.status(200).send({message : 'success get projects', results})
        })
        .catch((err) => {
            return res.status(500).send({message : err})
        })
    },

    searchProject : (req,res) =>{

        // -----------BACA--------------
        // formatbody : {
        //     name : 'namaProject',
        //     date : 'desc / asc',
        //     page : '1',
        //     limit : '3'
        // }

        var { page, limit, name, date} = req.body;
        
        var offset = (page * limit) - limit
        console.log(req.body)
        console.log(offset)
        
        Project.findAll({
            limit:parseInt(limit),
            // limit : 10,
            offset:offset,
            subQuery: false,
            attributes : [
                ["name", "projectName"],
                ["id", "projectId"],
                "description",
                "projectCreated",
                "projectEnded",
                "totalTarget",
                "projectImage",
                "shareDescription",
                [sequelize.fn('datediff', sequelize.col('projectEnded') ,  sequelize.fn("NOW")), 'SisaHari'],
                [sequelize.fn('SUM', sequelize.col('Payments.nominal')), 'totalNominal'],
                [sequelize.fn('COUNT', sequelize.col('Payments.id')), 'totalDonasi']
            ],
            include : 
                {
                    model : Payment,
                    required : false
                }
            ,
            where : {
                name : {
                    [Op.like] : `%${name}%`
                },
                isDeleted : 0,
                isGoing : 1
            },
            order : [['projectCreated', `${date}`]],
            group : ['id']
        })
        .then((results)=>{
            console.log(results.length)
            Project.count({
                where: {
                    name: {
                    [Op.like] : `%${name}%`
                    },
                    isDeleted : 0,
                    isGoing : 1
                }
            })
            .then((resultsTotalProject) => {
                
                let total = resultsTotalProject
                console.log('total  ' + total)
                
                return res.status(200).send({message : 'success get projects', results, total})
            })
            .catch((err) => {
                return res.status(500).send({message : err})
            })
        })
        .catch((err) => {
            console.log('nasuk')
            console.log(err)
            return res.status(500).send({message : err})
        })
    }
}