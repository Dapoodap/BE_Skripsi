const { DataTypes } = require('sequelize');
const db = require('../config/DB');

const TotalKeluhan = db.define('TotalKeluhan', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    bulan: {
      type: DataTypes.STRING
    },
    jumlahLaporan: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, { tableName: 'total_keluhan' });
  

  module.exports = TotalKeluhan;
