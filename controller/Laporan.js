const { Sequelize } = require("sequelize")
const Op = Sequelize.Op
const modelLaporan = require('../model/Laporan')
const modelPenghuni = require('../model/Account/Penghuni')
const nanoid = require('nanoid');
const bycrpt = require('bcrypt')

module.exports = {
    editLaporanById : async (req,res) =>{
        try {
            const {id} = req.params
            const theLaporan = await modelLaporan.findOne({
                where:{
                    id: id
                }
            });
            if(!theLaporan){
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: "failed to find laporan, cant find the id",
                    data: null
                  });
            }else{
                await theLaporan.update(req.body)
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "edit sukses"
                  });
            }
        } catch (error) {
            
        }
    },
    getAllLaporan : async (req,res) =>{
        try {
            const laporan = await modelLaporan.findAll({
                include: [
                  { model: modelPenghuni, attributes: ['id', 'nama', 'noKamar', 'noHP', 'alamat', 'jenisKelamin', 'TanggalMasuk', 'BiayaTambahan'] }
                ]
              });
            return(res.json({
                MessageEvent:'Get All Laporan',
                Status:200,
                Succses:true,
                Data:laporan,
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
    postLaporan : async (req,res) =>{
        try {
            const id = nanoid(10)
            const {IdPelapor,JenisKeluhan,DeskripsiKeluhan,TanggalLaporan} = req.body

            const data = await modelLaporan.create({
                id,
                IdPelapor,
                JenisKeluhan,
                DeskripsiKeluhan,
                TanggalLaporan
                
            })
            return res.status(201).json({
                status  : res.statusCode,
                succses : true,
                message : 'laporan baru ditambahkan',
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
    getLaporanById : async (req,res) =>{
        try {
            const {id} = req.params
            const theData = await modelLaporan.findOne({
                where:{
                    id: id
                }
            },{
                include : {
                    model : modelPenghuni,
                    attributes: ['id', 'nama', 'noKamar']
                }
            });
            if(!theData){
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: "failed to find laporan, cant find the id",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "laporan find",
                    data: theData
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
    deleteLaporanById : async (req,res) => {
        try {
            const {id} = req.params;
            const deletedLaporan = await modelLaporan.destroy({
                where :{
                    id: id
                }
            })
            if (!deletedLaporan) {
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: "failed to delete laporan, cant find the id",
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
    }
}