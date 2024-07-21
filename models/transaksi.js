const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Pemesanan = require('./pemesanan')

const Transaksi = sequelize.define('Transaksi', {
  transaksiID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true 
  },
  nominal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pemesananID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Pemesanan,
        key: 'pemesananID'
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Transaksi.belongsTo(Pemesanan, {foreignKey: 'pemesananID'});
Pemesanan.hasOne(Transaksi, {foreignKey: 'pemesananID'});

module.exports = Transaksi;
