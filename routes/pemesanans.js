var express = require('express');
var router = express.Router();
var Pemesanan = require('../models/pemesanan');
var Rekammedis = require('../models/rekammedis');

router.post('/', async (req, res, next) => {
    try {
        const { userID, date, poliID } = req.body;
        const antrian = 0;
        const antriananda = antrian + 1;
        const selesai = 0;
        
        const newPemesanan = await Pemesanan.create({ userID, date, poliID, selesai });
        const newRekammedis = await Rekammedis.create({ userID, date, poliID });
        
        res.status(201).json({
            newPemesanan,
            newRekammedis,
            antriananda,
            message: `Antrian anda adalah nomor ${antriananda}`
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
