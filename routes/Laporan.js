var express = require('express');
const router = express.Router()
const { getAllLaporan, postLaporan, getLaporanById, editLaporanById, deleteLaporanById } = require('../controller/Laporan')


// router.get('/',getAllPenghuni)
router.get('/',getAllLaporan)
router.post('/',postLaporan)
router.get('/:id',getLaporanById)
router.put('/:id',editLaporanById)
router.delete('/:id',deleteLaporanById)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router