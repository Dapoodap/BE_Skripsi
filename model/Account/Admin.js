// models/Penghuni.js
const { DataTypes } = require('sequelize');
const db = require('../../config/DB');


const Admin = db.define('Admin', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  isChange: {
    type: DataTypes.BOOLEAN, // Tipe data boolean untuk kolom isChange
    defaultValue: false // Nilai default dapat disesuaikan dengan kebutuhan
}
},{tableName: 'admin'});

module.exports = Admin;
