var express = require('express');
const { getAllDPInvoice, getDPByNomor, postDP, AccDPInvoice, DecDPInvoice, deleteDPByid } = require('../../controller/PayproofDP');
const { verifyToken } = require('../../controller/Auth');
const router = express.Router()


// router.get('/',getAllPenghuni)
router.get('/',verifyToken,getAllDPInvoice)
router.get('/:nomorInvoice',verifyToken,getDPByNomor)
router.post('/',verifyToken,postDP)
router.put('/acc/:id',verifyToken,AccDPInvoice)
router.put('/dec/:id',verifyToken,DecDPInvoice)
router.delete('/:id',verifyToken,deleteDPByid)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router