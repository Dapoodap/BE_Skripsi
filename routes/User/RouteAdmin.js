var express = require('express');
const router = express.Router()


router.get('/',(req,res)=>{
    res.json({
        MessageChannel:'ini get ALL ADMIN'
    })
})


// router.use('/signup')


module.exports = router