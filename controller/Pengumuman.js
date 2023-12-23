const { Sequelize } = require("sequelize")
const modelPengumuman = require('../model/Pengumuman')
const nanoid = require('nanoid');

module.exports = {
    editPengumumanById : async (req,res) =>{
        try {
            const {id} = req.params
            const thePengumuman = await modelPengumuman.update(req.body,{
                where:{
                    id:id
                }
            })
            if (!thePengumuman[0]) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to update pengumuman, cant find the kamar",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "pengumuman updated",
                    data: thePengumuman
                  });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                data: error
                });
        }
    },
    getAllPengumuman : async (req,res) =>{
        try {
            const pengumuman = await modelPengumuman.findAll();
            return(res.json({
                MessageEvent:'Get All Admin',
                Status:200,
                Succses:true,
                Data:pengumuman,
            }))
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                data: null
                });
        }
    },
    postPengumuman : async (req,res) =>{
        try {
            const id = nanoid(10)
            const {judulPengumuman,deskripsiPengumuman} = req.body
            const data = await modelPengumuman.create({
                id,
                judulPengumuman,
                deskripsiPengumuman
            })
            return res.status(201).json({
                status  : res.statusCode,
                succses : true,
                message : 'pengumuman baru ditambahkan',
                data
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                data: null
                });
        }
    },
    getPengumanById : async (req,res) =>{
        try {
            const {id} = req.params
            const thePengumuman = await modelPengumuman.findOne({
                where:{
                    id: id
                }
            });
            if(!thePengumuman){
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to find pengumuman, cant find the id",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "user find",
                    data: thePengumuman
                  });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                data: null
                });
        }
    },
    deletePengumumanById : async (req,res) => {
        try {
            const {id} = req.params;
            const deletedPengumuman = await modelPengumuman.destroy({
                where :{
                    id: id
                }
            })
            if (!deletedPengumuman) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to delete pengumuman, cant find the id",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: `admin ${id} have been deleted`
                  });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                data: null
                });
        }
    },
}