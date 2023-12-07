var express = require('express');
const router = express.Router()
const { getAllPengumuman, postPengumuman, getPengumanById, editPengumumanById, deletePengumumanById } = require('../controller/Pengumuman');


// router.get('/',getAllPenghuni)
router.get('/',getAllPengumuman)
router.post('/',postPengumuman)
router.get('/:id',getPengumanById)
router.put('/:id',editPengumumanById)
router.delete('/:id',deletePengumumanById)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router