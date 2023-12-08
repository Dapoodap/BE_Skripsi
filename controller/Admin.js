const { Sequelize } = require("sequelize")
const Op = Sequelize.Op
const modelAdmin = require('../model/Account/Admin')
const nanoid = require('nanoid');
const bycrpt = require('bcrypt')

module.exports = {
    editAdminById : async (req,res) =>{
        try {
            const {id} = req.params
            const theUser = await modelAdmin.findOne({
                where:{
                    id: id
                }
            });
            if(!theUser){
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to find admin, cant find the id",
                    data: null
                  });
            }else{
                const {username,password} = req.body
                const hashedPass = bycrpt.hashSync(password,10)
                await theUser.update({
                   username,
                   password : hashedPass,
                   isChange : true
                })
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "edit sukses"
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
    getAllAdmin : async (req,res) =>{
        try {
            const admin = await modelAdmin.findAll();
            return(res.json({
                MessageEvent:'Get All Admin',
                Status:200,
                Succses:true,
                Data:admin,
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
    postAdmin : async (req,res) =>{
        try {
            const id = nanoid(10)
            const usernameGenerate = `Adminus_${id}`
            const data = await modelAdmin.create({
                id,
                username : usernameGenerate,
                password : bycrpt.hashSync(`Adminpass_${id}`,10)
            })
            return res.status(201).json({
                status  : res.statusCode,
                succses : true,
                message : 'admin baru ditambahkan',
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
    getAdminById : async (req,res) =>{
        try {
            const {id} = req.params
            const theUser = await modelAdmin.findOne({
                where:{
                    id: id
                }
            });
            if(!theUser){
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to find admin, cant find the id",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "user find",
                    data: theUser
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
    deleteAdminById : async (req,res) => {
        try {
            const {id} = req.params;
            const deletedUser = await modelAdmin.destroy({
                where :{
                    id: id
                }
            })
            if (!deletedUser) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to delete admin, cant find the id",
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
    resetPasswordById : async (req,res) => {
        try {
            const {id} = req.params
            const theUser = await modelAdmin.findOne({
                where:{
                    id: id
                }
            });
            if(!theUser){
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to find admin, cant find the id",
                    data: null
                  });
            }else{
                const hashedPass = bycrpt.hashSync(`Adminpass_${id}`,10)
                await theUser.update({
                    username : `Adminus_${id}`,
                    password : hashedPass
                    
                })
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "reset sukses",
                    data: theUser
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
    }
}