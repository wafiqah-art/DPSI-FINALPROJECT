const { DataTypes } = require('sequelize');
const sequelize = require('../models/index');
const Doctor = require('./doctor')

const Poli = sequelize.define('Poli', {
  poliID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  namaPoli: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lantai: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  doctorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: Doctor,
        key: 'doctorID'
    }
  },
});

Poli.belongsTo(Doctor, {foreignKey: 'doctorID'});
Doctor.hasMany(Poli, {foreignKey: 'doctorID'});

module.exports = Poli;
