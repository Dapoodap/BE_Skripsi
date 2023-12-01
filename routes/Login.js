var express = require('express');
const router = express.Router()
const {LoginPenghuni, LoginAdmin} = require('../controller/Login')


// router.get('/',getAllPenghuni)
router.post('/penghuni',LoginPenghuni)
router.post('/admin',LoginAdmin)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router