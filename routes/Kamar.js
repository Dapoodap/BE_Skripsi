var express = require('express');
const router = express.Router()
const { getAllKamar, postKamar, getKamarById, editKamarById, deleteKamarById } = require('../controller/Kamar')


// router.get('/',getAllPenghuni)
router.get('/',getAllKamar)
router.post('/',postKamar)
router.get('/:id',getKamarById)
router.put('/:id',editKamarById)
router.delete('/:id',deleteKamarById)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router