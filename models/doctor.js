const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Doctor = sequelize.define('Doctor', {
  doctorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement : true 
  },
  namaDoctor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Doctor;
