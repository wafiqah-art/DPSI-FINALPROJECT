const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const Poli = require('./poli');

const Pemesanan = sequelize.define('Pemesanan', {
  pemesananID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true 
  },
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: User,
        key: 'userID'
    }
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poliID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Poli,
        key: 'poliID'
    }
  },
  selesai: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
});

Pemesanan.belongsTo(User, {foreignKey: 'userID'});
User.hasMany(Pemesanan, {foreignKey: 'userID'});

Pemesanan.belongsTo(Poli, {foreignKey: 'poliID'});
Poli.hasMany(Pemesanan, {foreignKey: 'poliID'});

module.exports = Pemesanan;
