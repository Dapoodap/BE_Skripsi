var express = require('express');
const router = express.Router()
const {editPenghuniById,gantiPassword} = require('../../controller/Penghuni')


// router.get('/',getAllPenghuni)
// router.post('/',postPenghuni)
// router.get('/:id',getPenghuniById)
router.put('/data/:id',editPenghuniById)
router.put('/pass/:id',gantiPassword)
// router.put('/pass/:id',resetPasswordById)
// router.delete()


// router.use('/signup')


module.exports = router