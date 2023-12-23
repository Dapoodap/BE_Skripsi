const { Sequelize } = require("sequelize")
const Op = Sequelize.Op
const modelPayme = require('../model/Payment/Payproof')
const modelPenghuni = require('../model/Account/Penghuni')
const nanoid = require('nanoid');
const bycrpt = require('bcrypt');
const { uploadImage, DeleteImage } = require("../helper");

module.exports = {
    postInvoice : async (req,res) =>{
        try {
            const id = nanoid(4)
            const myFile = req.file
            const {idPenghuni} = req.params
            const {nama,bulan} = req.body
            const nomorInvoice = `INV-${id}`
            const imageUrl = await uploadImage(myFile)
            const data = await modelPayme.create({
                id,
                idPenghuni,
                nama,
                nomorInvoice,
                bulan,
                gambar : imageUrl
            })
            return res.status(201).json({
                status  : res.statusCode,
                succses : true,
                message : 'invoice baru ditambahkan',
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
    getAllInvoiceSewa : async (req,res) =>{
        try {
            const inv = await modelPayme.findAll({
                include: [
                    { model: modelPenghuni}
                  ]
            });
            return(res.json({
                MessageEvent:'Get All INV',
                Status:200,
                Succses:true,
                Data:inv,
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
    getInvoiceByNomor : async (req,res) =>{
        try {
            const {nomorInvoice} = req.params
            const theInv = await modelPayme.findOne({
                where: { nomorInvoice: nomorInvoice },
                include: [
                  { model: modelPenghuni }
                ]
              });
              
            if(!theInv){
                return res.status(404).json({
                    status: 400,
                    success: false,
                    message: "failed to find invoice, cant find the nomor",
                    data: null
                  });
            }else{
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "user find",
                    data: theInv
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
    accInvoice: async (req, res) => {
        try {
            const { invoiceId } = req.params;

            const invoice = await modelPayme.findByPk(invoiceId, {
                include: [{
                    model: modelPenghuni,
                    attributes: ['id', 'dataPembayaran'] // Tentukan atribut apa saja yang ingin Anda ambil
                }]
            });

            if (!invoice) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Invoice not found',
                    data: null
                });
            }

            // Update status invoice menjadi 'acc'
            
            // Update status bulan pada data pembayaran penghuni
            const penghuni = invoice.Penghuni;
            const bulan = invoice.bulan;
            


            
            const data = (JSON.parse(penghuni.dataPembayaran))
            const index = data.findIndex(item => item.bulan === bulan);
            if (index !== -1) {
                data[index].status = true;
                penghuni.dataPembayaran = data
                await invoice.update({
                    status: 'acc'
                });

                await penghuni.save();
            }

            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Invoice accepted',
                // data: typeof(JSON.parse(JSON.parse(penghuni.dataPembayaran)))
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                success: false,
                message: 'Internal server error',
                data: null
            });
        }
    },
    declineInvoice: async (req, res) => {
        try {
            const {id} = req.params;
            const selectedINV = await modelPayme.findOne({
                where :{
                    id: id
                }
            })
            if(!theUser){
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: "failed to find invoice, cant find the id",
                    data: null
                  });
            }else{
                await theInvoice.update({
                    status: 'gagal'
                });
                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "invoice status updated",
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
    deleteInvoiceById : async (req,res) => {
        try {
            const { id } = req.params;
            const deletedINV = await modelPayme.findByPk(id); // Menggunakan findByPk untuk mendapatkan data penghuni yang dihapus
            const imageUrlInDatabase = deletedINV.gambar; // Ganti dengan atribut yang menyimpan URL gambar di model DP Anda
            const urlParts = imageUrlInDatabase.split('/');
            const blobName = urlParts.slice(4).join('/');

            // Hapus gambar dari Google Cloud Storage
            const deleteImageResult = await DeleteImage(blobName);
            const deleteINV = await modelPayme.destroy({
                where: {
                  id: id,
                },
              });

            if (!deleteINV) {
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
                    message: `gambar ada di cloud`
                  });
            }
        } catch (error) {
            const { id } = req.params;
            const deleteINV = await modelPayme.destroy({
                where: {
                  id: id,
                },
              });
              return res.status(200).json({
                status: 200,
                success: false,
                message: `gambar gaada di cloud`
              });
        }
    },
    postInvoiceCB : async (req,res) =>{
        try {
            const id = nanoid(4)
            const {idPenghuni} = req.params
            const {nama,bulan,url} = req.body
            const nomorInvoice = `INV-${id}`
            const imageUrl = url
            const data = await modelPayme.create({
                id,
                idPenghuni,
                nama,
                nomorInvoice,
                bulan,
                gambar : imageUrl
            })
            return res.status(201).json({
                status  : res.statusCode,
                succses : true,
                message : 'invoice baru ditambahkan',
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