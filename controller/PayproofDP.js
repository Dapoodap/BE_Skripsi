const { Sequelize } = require("sequelize")
const modelKamar = require('../model/Kamar')
const modelDP = require('../model/Payment/PayproofDP')
const nanoid = require('nanoid');
const bycrpt = require('bcrypt');
const {uploadImage,DeleteImage} = require("../helper");

module.exports = {
    getAllDPInvoice : async (req,res) =>{
        try {
            const INV = await modelDP.findAll();
            return(res.json({
                MessageEvent:'Get All DP INV',
                Status:200,
                Succses:true,
                Data:INV,
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
    postDP : async (req,res) =>{
        try {
            const myFile = req.file
            const id = nanoid(4)
            const {nama,noKamar,noHP,alamat,jenisKelamin,tanggal,tambahanBawaan,tambahanSewa} = req.body 
            const kamar = await modelKamar.findOne({ where: { noKamar } });
            if (!kamar) {
                return null;
              }
            if (kamar.status === 'isi') {
                return res.status(401).json({
                    status  : res.statusCode,
                    succses : false,
                    message : 'kamar penuh',
                })
            }
            const totalSewa = parseFloat(tambahanSewa) + parseFloat(kamar.hargaKamar)
            const totalDP = 0.5 * totalSewa
            await kamar.update({
                statusKamar : "isi"
            })
            // const imageUrl = await uploadImage(myFile)
            // const data = await modelDP.create({
            //         id,
            //         nomorInvoice : `INV-${id}`,
            //         nama,
            //         noKamar,
            //         noHP,
            //         alamat,
            //         jenisKelamin,
            //         tanggal,
            //         tambahanBawaan,
            //         tambahanSewa,
            //         totalDP,
            //         totalSewa,
            //         gambar : imageUrl

            // })
            return res.status(201).json({
                status  : res.statusCode,
                succses : true,
                message : 'invoice baru ditambahkan',
                data : totalDP
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
    getDPByNomor : async (req,res) =>{
        try {
            const {nomorInvoice} = req.params
            const theINV = await modelDP.findOne({
                where:{
                    nomorInvoice: nomorInvoice
                }
            });
            if(!theINV){
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to find inv, cant find the number",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "user find",
                    data: theINV
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
    deleteDPByid : async (req,res) => {
        try {
            const {id} = req.params;
            const selectedINV = await modelDP.findOne({
                where :{
                    id: id
                }
            })
           if (!selectedINV) {
            return res.status(404).json({
                        status: 404,
                        success: false,
                        message: "failed to delete INV, cant find the id",
                        data: null
                      });
           }
           const kamar = await modelKamar.findOne({ where: { noKamar : selectedINV.noKamar } });
           if (!kamar) {
            return res.status(404).json({
                status: 404,
                success: false,
                message: "failed to delete INV, cant find nomor kamar",
                data: null
              });
           }
            await kamar.update({
            statusKamar : "kosong"
            })
                
            const imageUrlInDatabase = selectedINV.gambar; // Ganti dengan atribut yang menyimpan URL gambar di model DP Anda
            const urlParts = imageUrlInDatabase.split('/');
            const blobName = urlParts.slice(4).join('/');

            // Hapus gambar dari Google Cloud Storage
            const deleteImageResult = await DeleteImage(blobName);
            const deletedDP = await modelDP.destroy({
                where: {
                  id: id,
                },
              });

            if (!deletedDP) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to delete INV, cant find the id",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: `inv ${id} have been deleted ${deleteImageResult}`
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
    AccDPInvoice : async (req,res) => {
        try {
            const {id} = req.params
            const theINV = await modelDP.findOne({
                where:{
                    id: id
                }
            });
            if(!theINV){
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to find inv, cant find the id",
                    data: null
                  });
            }else{
                await theINV.update({
                    status: 'acc'
                });
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "invoice sukes"
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
    DecDPInvoice : async (req,res) => {
        try {
            const {id} = req.params
            const theINV = await modelDP.findOne({
                where:{
                    id: id
                }
            });
            if(!theINV){
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to find inv, cant find the id",
                    data: null
                  });
            }else{
                const kamar = await modelKamar.findOne({ where: { noKamar : theINV.noKamar } });

                if (!kamar) {
                    return null;
                }
                await kamar.update({
                    statusKamar : "kosong"
                })
                await theINV.update({
                    status: 'gagal'
                });
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "invoice gagal"
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