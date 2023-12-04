const { DataTypes } = require('sequelize');
const db = require('../config/DB');

const TotalKeluhan = db.define('TotalKeluhan', {
    bulan: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    jumlahLaporan: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, { tableName: 'total_keluhan' });
  

  module.exports = TotalKeluhan;
