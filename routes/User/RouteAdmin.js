var express = require('express');
const router = express.Router()
const {getAllAdmin,getAdminById,postAdmin,deleteAdminById,resetPasswordById,editAdminById} = require('../../controller/Admin');
const { verifyToken } = require('../../controller/Auth');


router.get('/',getAllAdmin)
router.post('/',postAdmin)
router.get('/:id',verifyToken,getAdminById)
router.put('/:id',verifyToken,editAdminById)
router.put('/pass/:id',verifyToken,resetPasswordById)
router.delete('/:id',verifyToken,deleteAdminById)


module.exports = router