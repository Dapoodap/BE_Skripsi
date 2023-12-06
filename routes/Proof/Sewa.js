var express = require('express');
const { postInvoice, getAllInvoiceSewa, accInvoice, declineInvoice, deleteInvoiceById, getInvoiceByNomor } = require('../../controller/PayproofPenghuni');
const router = express.Router()


// router.get('/',getAllPenghuni)
router.get('/',getAllInvoiceSewa)
router.get('/:nomorInvoice',getInvoiceByNomor)
router.post('/:idPenghuni',postInvoice)
router.put('/acc/:invoiceId',accInvoice)
router.put('/dec/:invoiceId',declineInvoice)
router.delete('/:id',deleteInvoiceById)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router