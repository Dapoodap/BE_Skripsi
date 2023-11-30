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
  noHP: {
    type: DataTypes.INTEGER
  },
  TanggalMasuk: {
    type: DataTypes.DATE
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
},{tableName: 'penghuni'});

module.exports = Penghuni;
