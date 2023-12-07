const express = require('express')
const router = express.Router()
const penghuni = require('./User/RoutePenghuni')
const admin = require('./User/RouteAdmin')
const login = require('./Login')
const auth = require('./Auth')
const kamar = require('./Kamar')
const laporan = require('./Laporan')
const sewa = require('../routes/Proof/Sewa')
const dp = require('../routes/Proof/DP')
const pengum = require('../routes/Pengumuman')
const uploadImage = require('../helper')


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
router.use('/inv',sewa)
router.use('/dp',dp)
router.use('/pengumuman',pengum)



module.exports = router;