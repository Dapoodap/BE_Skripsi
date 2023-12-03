var express = require('express');
const router = express.Router()
const {getAllPenghuni,postPenghuni,getPenghuniById,editPenghuniById,deleteUserById,resetPasswordById, gantiPassword} = require('../../controller/Penghuni');
const { verifyToken } = require('../../controller/Auth');


router.get('/',getAllPenghuni)
router.post('/',postPenghuni)
router.get('/:id',getPenghuniById)
router.put('/:id',editPenghuniById)
router.put('/pass/:id',resetPasswordById)
router.put('/change/:id',gantiPassword)
router.delete('/:id',deleteUserById)

module.exports = router