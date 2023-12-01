var express = require('express');
const router = express.Router()
const {getAllAdmin,getAdminById,postAdmin,deleteAdminById,resetPasswordById,editAdminById} = require('../../controller/Admin')


router.get('/',getAllAdmin)
router.post('/',postAdmin)
router.get('/:id',getAdminById)
router.put('/:id',editAdminById)
router.put('/pass/:id',resetPasswordById)
router.delete('/:id',deleteAdminById)


module.exports = router