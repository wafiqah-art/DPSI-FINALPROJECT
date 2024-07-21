var express = require('express');
var router = express.Router();
var Poli = require('../models/poli');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/',authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Polis = await Poli.findAll();
        res.json(Polis);
    } catch (err) {
        next(err);
    }
});

router.post('/',authenticate, async (req, res, next) => {
    try {
        const { namaPoli, lantai, doctorID } = req.body;
        const newPoli = await Poli.create({ namaPoli, lantai, doctorID });
        res.status(201).json(newPoli);
    } catch (err) {
        next(err);
    }
});

router.put('/:poliID',authenticate, async (req, res, next) => {
    try {
        const { namaPoli, lantai, doctorID } = req.body;
        const Polis = await Poli.findByPk(req.params.poliID);
        if (Polis) {
            Polis.namaPoli = namaPoli;
            Polis.lantai = lantai;
            Polis.doctorID = doctorID;
            await Polis.save();
            res.json(Polis);
        } else {
            res.status(404).json({ message: 'Poli tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:poliID',authenticate, async (req, res, next) => {
    try {
        const Polis = await Poli.findByPk(req.params.poliID);
        if (Polis) {
            await Polis.destroy();
            res.json({ message: 'Poli dihapus' });
        } else {
            res.status(404).json({ message: 'Poli tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;