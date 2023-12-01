const { Sequelize } = require("sequelize")
const Op = Sequelize.Op
const modelPenghuni = require('../model/Account/Penghuni')
const nanoid = require('nanoid');
const bycrpt = require('bcrypt')

module.exports = {
    getAllPenghuni : async (req,res) =>{
        try {
            const penghuni = await modelPenghuni.findAll();
            return(res.json({
                MessageEvent:'Get All Penghuni',
                Status:200,
                Succses:true,
                Data:penghuni,
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
    postPenghuni : async (req,res) =>{
        try {
            const id = nanoid(10)
            const {nama,noKamar,noHP,TanggalMasuk,alamat,jenisKelamin} = req.body;
            const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const usernameGenerate = `pghn_${noKamar}`
            const passwordGenerate = bycrpt.hashSync(`pass_${noKamar}`,10)
            const data = await modelPenghuni.create({
                id,
                nama,
                noKamar,
                noHP,
                alamat,
                jenisKelamin,
                TanggalMasuk,
                username : usernameGenerate,
                password : passwordGenerate,
                dataPembayaran : months.map(bulan => ({
                    bulan,
                    status: false // Belum dibayar
                }))
            })
            return res.status(201).json({
                status  : res.statusCode,
                succses : true,
                message : 'penghuni baru ditambahkan',
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
    getPenghuniById : async (req,res) =>{
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
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "user find",
                    data: theUser
                  });
            }
        } catch (error) {
            
        }
    },
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
                    password : hashedPass,
                    isChange : true
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
    deleteUserById : async (req,res) => {
        try {
            const {id} = req.params;
            const deletedUser = await modelPenghuni.destroy({
                where :{
                    id: id
                }
            })
            if (!deletedUser) {
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: "failed to delete user, cant find the id",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: `user ${id} have been deleted`
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
                const hashedPass = bycrpt.hashSync(`pass_${theUser.noKamar}`,10)
                await theUser.update({
                    password : hashedPass,
                    isChange : false
                })
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "reset sukses",
                    data: theUser
                  });
            }
        } catch (error) {
            
        }
    }
    
}