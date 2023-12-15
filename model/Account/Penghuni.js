// models/Penghuni.js
const { DataTypes } = require('sequelize');
const db = require('../../config/DB');
const kamar = require('../Kamar');
const laporan = require("../Laporan")
const TotalLaporanBulanan = require("../LaporanTotal");

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
  BarangBawaan: {
    type: DataTypes.TEXT, // atau DataTypes.ARRAY(DataTypes.JSON) jika Sequelize mendukung
    defaultValue: []
  },
  BiayaTambahan: {
    type: DataTypes.FLOAT
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
},
  BiayaSewaBulanan: {
    type: DataTypes.FLOAT
  },
  dataPembayaran: {
    type: DataTypes.JSON,  // atau DataTypes.ARRAY(DataTypes.JSON) jika Sequelize mendukung
    defaultValue: [] // default array kosong
  }
},{tableName: 'penghuni'});

Penghuni.belongsTo(kamar, { foreignKey: 'noKamar' });
Penghuni.hasMany(laporan, { foreignKey: 'IdPelapor', onDelete: 'CASCADE' });
laporan.belongsTo(Penghuni, { foreignKey: 'IdPelapor', onDelete: 'CASCADE' });


// Penghuni.prototype.updatePaymentStatus = async function (bulan) {
//   const index = this.dataPembayaran.findIndex(item => item.bulan === bulan);
//   if (index !== -1) {
//     this.dataPembayaran[index].status = true;
//     await this.save();
//   }
// };
module.exports = Penghuni;
