var express = require('express');
const router = express.Router()
const { getAllKamar, postKamar, getKamarById, editKamarById, deleteKamarById } = require('../controller/Kamar');
const { verifyToken } = require('../controller/Auth');


// router.get('/',getAllPenghuni)
router.get('/',getAllKamar)
router.post('/',verifyToken,postKamar)
router.get('/:noKamar',getKamarById)
router.put('/:noKamar',verifyToken,editKamarById)
router.delete('/:id',verifyToken,deleteKamarById)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router