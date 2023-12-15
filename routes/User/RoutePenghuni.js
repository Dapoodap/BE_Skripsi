var express = require('express');
const router = express.Router()
const {getAllPenghuni,postPenghuni,getPenghuniById,editPenghuniById,deleteUserById,resetPasswordById, gantiPassword} = require('../../controller/Penghuni');
const { verifyToken } = require('../../controller/Auth');


router.get('/',getAllPenghuni)
router.post('/',postPenghuni)
router.get('/:id',getPenghuniById)
router.put('/:id',verifyToken,editPenghuniById)
router.put('/pass/:id',verifyToken,resetPasswordById)
router.put('/change/:id',verifyToken,gantiPassword)
router.delete('/:id',verifyToken,deleteUserById)

module.exports = router