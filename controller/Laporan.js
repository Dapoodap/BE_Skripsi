const { Sequelize } = require("sequelize")
const Op = Sequelize.Op
const modelLaporan = require('../model/Laporan')
const modelPenghuni = require('../model/Account/Penghuni')
const modelTotalLaporan = require('../model/LaporanTotal')
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
                return res.status(404).json({
                    status: 404,
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
            console.log(error)
            return res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                data: null
                }); 
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
    getAllTotalLaporan : async (req,res) =>{
        try {
            const laporan = await modelTotalLaporan.findAll();
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
            // if (isNaN(parsedTanggalLaporan)) {
            //     return res.status(400).json({ error: 'Format tanggal tidak valid.' });
            // }
            const bulanInput = new Date(TanggalLaporan).toLocaleString('en-US', { month: 'long' }).toUpperCase();

            // const bulan = (new Date()).toLocaleString('en-US', { month: 'long' }).toUpperCase();
            
            const bulanCari = await modelTotalLaporan.findOne({
                where:{
                    bulan: bulanInput
                }
            });
            if (!bulanCari) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to find month, month doesnt exist",
                    data: null
                  });
            }
            await bulanCari.update({
                jumlahLaporan : bulanCari.jumlahLaporan +=1
            })
            await modelLaporan.create({
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
                },include: [
                    { model: modelPenghuni }
                  ]
            },{
                include : {
                    model : modelPenghuni,
                    attributes: ['id', 'nama', 'noKamar']
                }
            });
            if(!theData){
                return res.status(404).json({
                    status: 404,
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
            const theLaporan = await modelLaporan.findOne({
                where:{
                    id: id
                }
            });
            if (!theLaporan) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to find laporan, cant find the id",
                    data: null
                  });
            }
            const bulanQuery = new Date(theLaporan.TanggalLaporan).toLocaleString('en-US', { month: 'long' }).toUpperCase();
            const bulanCari = await modelTotalLaporan.findOne({
                where:{
                    bulan: bulanQuery
                }
            });
            if (!bulanCari) {
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: "failed to find month, cant find the id",
                    data: null
                  });
            }
            await bulanCari.update({
                jumlahLaporan : bulanCari.jumlahLaporan -=1
            })
            await theLaporan.destroy()  
            return res.status(201).json({
                status  : res.statusCode,
                succses : true,
                message : 'suskses hapus laporan'
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
    postTotalLaporan : async (req,res) =>{
        try {
            const {bulan} = req.body
            const data = await modelTotalLaporan.create({
                bulan
            })
            return res.status(201).json({
                status  : res.statusCode,
                succses : true,
                message : 'bulan laporan baru ditambahkan',
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
}