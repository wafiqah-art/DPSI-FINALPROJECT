const { Sequelize } = require('sequelize');
require('dotenv').config();  // Muat variabel lingkungan dari .env
// Fix "Please install mysql2 package manually".
const mysql2 = require('mysql2');


// Konfigurasi koneksi Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
    }
);

// Uji koneksi
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Ekspor instance sequelize untuk digunakan di tempat lain
module.exports = sequelize;
