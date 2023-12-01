const { Sequelize } = require("sequelize")
const Op = Sequelize.Op
const modelPenghuni = require('../model/Account/Penghuni')
const nanoid = require('nanoid');
const bycrpt = require('bcrypt')

module.exports = {
    editPenghuniById : async (req,res) =>{
        try {
            const {id} = req.params
            const theUser = await modelPenghuni.findOne({
                where:{
                    id: id
                }
            });
            if(!theUser){
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: "failed to find user, cant find the id",
                    data: null
                  });
            }else{
                const {nama,noHP,alamat,jenisKelamin} = req.body
                await theUser.update({
                    nama,
                    noHP,
                    alamat,
                    jenisKelamin
                })
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "reset sukses"
                  });
            }
        } catch (error) {
            
        }
    },
    gantiPassword : async (req,res) =>{
        try {
            const {id} = req.params
            const theUser = await modelPenghuni.findOne({
                where:{
                    id: id
                }
            });
            if(!theUser){
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: "failed to find user, cant find the id",
                    data: null
                  });
            }else{
                const {password} = req.body
                const hashedPass = bycrpt.hashSync(password,10)
                await theUser.update({
                   password : hashedPass
                })
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "reset sukses"
                  });
            }
        } catch (error) {
            
        }
    }
    
}