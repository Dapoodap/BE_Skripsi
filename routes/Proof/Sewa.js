var express = require('express');
const { postInvoice, getAllInvoiceSewa, accInvoice, declineInvoice, deleteInvoiceById, getInvoiceByNomor, postInvoiceCB } = require('../../controller/PayproofPenghuni');
const { verifyToken } = require('../../controller/Auth');
const router = express.Router()


// router.get('/',getAllPenghuni)
router.get('/',verifyToken,getAllInvoiceSewa)
router.get('/:nomorInvoice',verifyToken,getInvoiceByNomor)
router.post('/:idPenghuni',verifyToken,postInvoice)
router.post('/cb/:idPenghuni',verifyToken,postInvoiceCB)
router.put('/acc/:invoiceId',verifyToken,accInvoice)
router.put('/dec/:invoiceId',verifyToken,declineInvoice)
router.delete('/:id',verifyToken,deleteInvoiceById)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router