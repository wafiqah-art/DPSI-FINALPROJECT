const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const Poli = require('./poli');

const Rekammedis = sequelize.define('rekammedis', {
  rmId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true,
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
    type: DataTypes.DATE,
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
});

Rekammedis.belongsTo(User, {foreignKey: 'userID'});
User.hasOne(Rekammedis, {foreignKey: 'userID'});

Rekammedis.belongsTo(Poli, {foreignKey: 'poliID'});
Poli.hasMany(Rekammedis, {foreignKey: 'poliID'});

module.exports = Rekammedis;
