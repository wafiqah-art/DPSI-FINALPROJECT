var express = require('express');
var router = express.Router();
var Rekammedis = require('../models/rekammedis');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/',authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Rekammediss = await Rekammedis.findAll();
        res.json(Rekammediss);
    } catch (err) {
        next(err);
    }
});

router.post('/',authenticate, async (req, res, next) => {
    try {
        const { userID, date, poliID } = req.body;
        const newRekammedis = await Rekammedis.create({ userID, date, poliID });
        res.status(201).json(newRekammedis);
    } catch (err) {
        next(err);
    }
});

router.put('/:rmID',authenticate, async (req, res, next) => {
    try {
        const { userID, date, poliID } = req.body;
        const Rekammediss = await Rekammedis.findByPk(req.params.rmID);
        if (Rekammediss) {
            Rekammediss.userID =  userID;
            Rekammediss.date = date;
            Rekammediss.poliID = poliID;
            await Rekammediss.save();
            res.json(Rekammediss);
        } else {
            res.status(404).json({ message: 'Rm tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:rmID',authenticate, async (req, res, next) => {
    try {
        const Rekammediss = await Rekammedis.findByPk(req.params.rmID);
        if (Rekammediss) {
            await Rekammediss.destroy();
            res.json({ message: 'Rm dihapus' });
        } else {
            res.status(404).json({ message: 'Rm tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;