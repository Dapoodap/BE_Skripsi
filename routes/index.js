const express = require('express')
const router = express.Router()
const penghuni = require('./User/RoutePenghuni')
const admin = require('./User/RouteAdmin')


router.get('/',(req,res)=>{
    res.json({
        MessageEvent:'succses, silahkan lihat dokumentasi API untuk menggunakan',
        status:res.statusCode
    })
})

router.use('/penghuni',penghuni)
router.use('/admin',admin)
module.exports = router;