var express = require('express');
const router = express.Router()
const {verifyToken, verifyTokenAdmin} = require('../controller/Auth')


// router.get('/',getAllPenghuni)
router.get('/',verifyToken)
// router.get('/:id',getPenghuniById)
// router.put('/:id',editPenghuniById)
// router.put('/pass/:id',resetPasswordById)
// router.delete('/:id',deleteUserById)

module.exports = router