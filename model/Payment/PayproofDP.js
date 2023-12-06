const { DataTypes } = require('sequelize');
const db = require('../../config/DB');

const InvoiceDP = db.define('InvoiceDP', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  nomorInvoice: {
    type: DataTypes.STRING
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
  status: {
    type: DataTypes.ENUM('pending', 'acc','gagal'), // Add more status if needed
    defaultValue: 'pending'
  },
  tanggal: {
    type: DataTypes.DATE
  },
  tambahanBawaan: {
    type: DataTypes.JSON, // atau DataTypes.ARRAY(DataTypes.JSON) jika Sequelize mendukung
    defaultValue: [] // default array kosong
  },
  tambahanSewa: {
    type: DataTypes.FLOAT 
  },
  totalSewa: {
    type: DataTypes.FLOAT
  },
  totalDP: {
    type: DataTypes.FLOAT
  },
  gambar: {
    type: DataTypes.TEXT
  }
},{tableName: 'invoice_DP'});
module.exports = InvoiceDP;
