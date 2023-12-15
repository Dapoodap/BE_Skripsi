var express = require('express');
const router = express.Router()
const { getAllPengumuman, postPengumuman, getPengumanById, editPengumumanById, deletePengumumanById } = require('../controller/Pengumuman');
const { verifyToken } = require('../controller/Auth');


// router.get('/',getAllPenghuni)
router.get('/',verifyToken,getAllPengumuman)
router.post('/',verifyToken,postPengumuman)
router.get('/:id',verifyToken,getPengumanById)
router.put('/:id',verifyToken,editPengumumanById)
router.delete('/:id',verifyToken,deletePengumumanById)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router