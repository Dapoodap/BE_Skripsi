require('dotenv').config()
const express = require ('express')
var path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
const multer = require('multer')
var logger = require('morgan');
var cookieParser = require('cookie-parser');


const app = express()
app.use(cors());
app.use(express.json());


const allRoute = require('./routes/index')
const db = require('./config/DB')
const Penghuni = require('./model/Account/Penghuni')
const Admin = require('./model/Account/Admin')
const Kamar = require('./model/Kamar')
const Laporan = require('./model/Laporan');
const TotalKeluhan = require('./model/LaporanTotal');
const Sewa = require('./model/Payment/Payproof');
const DP = require('./model/Payment/PayproofDP');
const pengumuman = require('./model/Pengumuman');
const uploadImage = require('./helper');



const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  })
  
  app.disable('x-powered-by')
  app.use(multerMid.single('file'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(allRoute)

app.listen(process.env.port,()=>{
    console.log(`Example app listening at http://localhost:${process.env.port}`)
})
db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    db.sync().then(() => {
        console.log('All tables created successfully!');
    }).catch((error) => {
        console.error('Unable to create tables: ', error);
    });
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = app;