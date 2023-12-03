const express = require('express')
const router = express.Router()
const penghuni = require('./User/RoutePenghuni')
const admin = require('./User/RouteAdmin')
const login = require('./Login')
const auth = require('./Auth')
const kamar = require('./Kamar')
const laporan = require('./Laporan')


router.get('/',(req,res)=>{
    res.json({
        MessageEvent:'succses, silahkan lihat dokumentasi API untuk menggunakan',
        status:res.statusCode
    })
})

router.use('/penghuni',penghuni)
router.use('/admin',admin)
router.use('/login',login)
router.use('/auth',auth)
router.use('/kamar',kamar)
router.use('/lapor',laporan)


module.exports = router;