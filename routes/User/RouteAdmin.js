var express = require('express');
const router = express.Router()
const {getAllPenghuni,postPenghuni,getPenghuniById,editPenghuniById,deleteUserById,resetPasswordById} = require('../../controller/Admin')


router.get('/',getAllPenghuni)
router.post('/',postPenghuni)
router.get('/:id',getPenghuniById)
router.put('/:id',editPenghuniById)
router.put('/pass/:id',resetPasswordById)
router.delete('/:id',deleteUserById)


// router.use('/signup')


module.exports = router