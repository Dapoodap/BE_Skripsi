const { Sequelize } = require("sequelize")
const nanoid = require('nanoid');
const modelKamar = require('../model/Kamar')

module.exports = {
    getAllKamar : async (req,res) =>{
        try {
            const kamar = await modelKamar.findAll();
            return(res.json({
                MessageEvent:'Get All Kamar',
                Status:200,
                Succses:true,
                Data:kamar,
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
    postKamar : async (req,res) =>{
        try {
            const id = nanoid(10)
            const {gambarKamar,noKamar,tipeKamar,ratingKamar,deskripsiKamar,fasilitasKamar,hargaKamar} = req.body
            const data = await modelKamar.create({
                id,
                gambarKamar,
                noKamar,
                tipeKamar,
                ratingKamar,
                deskripsiKamar,
                fasilitasKamar,
                hargaKamar
            })
            return res.status(201).json({
                status  : res.statusCode,
                succses : true,
                message : 'kamar baru ditambahkan',
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
    editKamarById : async (req,res)=>{
        try {
            const {id} = req.params
            const theKamar = await modelKamar.update(req.body,{
                where:{
                    id:id
                }
            })
            if (!theKamar[0]) {
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: "failed to update kamar, cant find the kamar",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "kamar updated",
                    data: theKamar
                  });
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                data: null
                });
        }
    },
    getKamarById : async (req,res) =>{
        try {
            const {id} = req.params
            const theKamar = await modelKamar.findOne({
                where:{
                    id: id
                }
            });
            if(!theKamar){
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: "failed to find kamar, cant find the id",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "kamar find",
                    data: theKamar
                  });
            }
        } catch (error) {
            return res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                data: null
                });
        }
    },
    deleteKamarById : async (req,res) => {
        try {
            const {id} = req.params;
            const deletedKamar = await modelKamar.destroy({
                where :{
                    id: id
                }
            })
            if (!deletedKamar) {
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: "failed to delete kamar, cant find the id",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: `kamar ${id} have been deleted`
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