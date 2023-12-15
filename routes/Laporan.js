var express = require('express');
const router = express.Router()
const { getAllLaporan, postLaporan, getLaporanById, editLaporanById, deleteLaporanById, postTotalLaporan, getAllTotalLaporan } = require('../controller/Laporan');
const { verifyToken } = require('../controller/Auth');


// router.get('/',getAllPenghuni)
router.get('/',verifyToken,getAllLaporan)
router.get('/total',getAllTotalLaporan)
router.post('/',verifyToken,postLaporan)
router.post('/total',postTotalLaporan)
router.get('/:id',verifyToken,getLaporanById)
router.put('/:id',verifyToken,editLaporanById)
router.delete('/:id',verifyToken,deleteLaporanById)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router