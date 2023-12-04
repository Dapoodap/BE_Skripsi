const { DataTypes } = require('sequelize');
const db = require('../config/DB');
const Penghuni = require('../model/Account/Penghuni');




const Laporan = db.define('Laporan', {
  id: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  IdPelapor: {
    type: DataTypes.STRING
  },
  JenisKeluhan: {
    type: DataTypes.STRING
  },
  DeskripsiKeluhan: {
    type: DataTypes.TEXT
  },
  TanggalLaporan: {
    type: DataTypes.DATE
  },
  StatusLaporan: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
},{tableName: 'laporan'});


module.exports = Laporan;
