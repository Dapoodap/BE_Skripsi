const { Sequelize } = require("sequelize")
const Op = Sequelize.Op
const modelPayme = require('../model/Payment/Payproof')
const modelPenghuni = require('../model/Account/Penghuni')
const nanoid = require('nanoid');
const bycrpt = require('bcrypt')

module.exports = {
    postInvoice : async (req,res) =>{
        try {
            const id = nanoid(4)
            const {idPenghuni} = req.params
            const {nama,bulan} = req.body
            const nomorInvoice = `INV-${id}`
            const data = await modelPayme.create({
                id,
                idPenghuni,
                nama,
                nomorInvoice,
                bulan,
               gambar : "Ini tes GBR"
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
                MessageEvent:'Get All Admin',
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
                where:{nomorInvoice: nomorInvoice}});
            if(!theInv){
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "failed to find invoice, cant find the id",
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
            await invoice.update({
                status: 'acc'
            });

            // Update status bulan pada data pembayaran penghuni
            const penghuni = invoice.Penghuni;
            const bulan = invoice.bulan;
            


            
            const data = JSON.parse(penghuni.dataPembayaran)
            const index = data.findIndex(item => item.bulan === bulan);
            if (index !== -1) {
                data[index].status = true;
                penghuni.dataPembayaran = JSON.stringify(data);
                await penghuni.save();
            }

            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Invoice accepted',
                data : data[index].status
                // data: 
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
            const {invoiceId} = req.params
            const theInvoice = await modelPayme.findOne({
                where:{invoiceId: invoiceId},
            });
            if(!theUser){
                return res.status(400).json({
                    status: 400,
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
    
            if (!deletedINV) {
                return res.status(200).json({
                    status: 200,
                    success: false,
                    message: `failed to delete inv, cannot find user with id ${id}`,
                    data: null
                });
            }
            await deletedINV.destroy();
    
            return res.status(200).json({
                status: 200,
                success: true,
                message: `inv ${id} has been deleted`
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                data: null
            });
        }
    },
}