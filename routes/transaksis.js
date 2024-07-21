var express = require('express');
var router = express.Router();
var Transaksi = require('../models/transaksi');
var Pemesanan = require('../models/pemesanan');

router.post('/', async (req, res, next) => {
    try {
        const { nominal, pemesananID } = req.body;
        const status = 'done'
        const selesai = 1
        const pemesananss = await Pemesanan.findByPk(pemesananID);
        if (pemesananss) {
            pemesananss.selesai =  selesai;}
            await pemesananss.save();
            res.json(pemesananss);
        const newTransaksi = await Transaksi.create({ nominal, pemesananID, status });
        res.status(201).json(newTransaksi);
    } catch (err) {
        next(err);
    }
});

module.exports = router;