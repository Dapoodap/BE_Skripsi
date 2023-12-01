// models/Penghuni.js
const { DataTypes } = require('sequelize');
const db = require('../../config/DB');


const Penghuni = db.define('Penghuni', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nama: {
    type: DataTypes.STRING
  },
  noKamar: {
    type: DataTypes.STRING
  },
  noHP: {
    type: DataTypes.STRING
  },
  alamat: {
    type: DataTypes.STRING
  },
  jenisKelamin: {
    type: DataTypes.STRING
  },
  TanggalMasuk: {
    type: DataTypes.DATE
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  dataPembayaran: {
    type: DataTypes.JSON, // atau DataTypes.ARRAY(DataTypes.JSON) jika Sequelize mendukung
    defaultValue: [] // default array kosong
  }
},{tableName: 'penghuni'});

module.exports = Penghuni;
