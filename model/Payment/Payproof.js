// models/Penghuni.js
const { DataTypes } = require('sequelize');
const db = require('../../config/DB');
const Penghuni = require('../Account/Penghuni');

const Invoice = db.define('Invoice', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  idPenghuni: {
    type: DataTypes.STRING
  },
  nomorInvoice: {
    type: DataTypes.STRING
  },
  nama: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('pending', 'acc','gagal'), // Add more status if needed
    defaultValue: 'pending'
  },
  bulan: {
    type: DataTypes.STRING
  },
  gambar: {
    type: DataTypes.TEXT
  }
},{tableName: 'invoice_sewa'});
Invoice.belongsTo(Penghuni, { foreignKey: 'idPenghuni', onDelete: 'CASCADE' });
module.exports = Invoice;
