var express = require('express');
const { getAllDPInvoice, getDPByNomor, postDP, AccDPInvoice, DecDPInvoice, deleteDPByid } = require('../../controller/PayproofDP');
const router = express.Router()


// router.get('/',getAllPenghuni)
router.get('/',getAllDPInvoice)
router.get('/:nomorInvoice',getDPByNomor)
router.post('/',postDP)
router.put('/acc/:id',AccDPInvoice)
router.put('/dec/:id',DecDPInvoice)
router.delete('/:id',deleteDPByid)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router