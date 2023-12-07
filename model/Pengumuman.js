const { DataTypes } = require('sequelize');
const db = require('../config/DB');

const Pengumuman = db.define('Penguman', {
  id: {
    type: DataTypes.STRING, 
    primaryKey: true
  },
  judulPengumuman: {
    type: DataTypes.STRING
  },
  deskripsiPengumuman: {
    type: DataTypes.STRING
  },
  
},{tableName: 'pengumuan'});


module.exports = Pengumuman;
