const { DataTypes } = require('sequelize');
const db = require('../config/DB');


const Kamar = db.define('Kamar', {
  gambarKamar: {
    type: DataTypes.JSON, 
    defaultValue: [] 
  },
  noKamar: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  tipeKamar: {
    type: DataTypes.STRING
  },
  statusKamar: {
    type: DataTypes.STRING,
    defaultValue: "kosong"
  },
  ratingKamar: {
    type: DataTypes.STRING
  },
  deskripsiKamar: {
    type: DataTypes.TEXT
  },
  fasilitasKamar: {
    type: DataTypes.JSON, // atau DataTypes.ARRAY(DataTypes.JSON) jika Sequelize mendukung
    defaultValue: [] // default array kosong
  },
  hargaKamar: {
    type: DataTypes.FLOAT
  }
},{tableName: 'kamar'});

module.exports = Kamar;
