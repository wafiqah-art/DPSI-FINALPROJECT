var express = require('express');
var router = express.Router();
var Doctor = require('../models/doctor');
const { authenticate, authorize } = require('../middleware/auth');


//membatasi bahwa hanya admin yang bisa menggunakan end point pada data doctor
router.get('/', authenticate, authorize(['admin']), async (req, res, next) => {
    try {
        const Doctors = await Doctor.findAll();
        res.json(Doctors);
    } catch (err) {
        next(err);
    }
});

router.post('/', authenticate, async (req, res, next) => {
    try {
        const { namaDoctor } = req.body;
        const newDoctor = await Doctor.create({ namaDoctor });
        res.status(201).json(newDoctor);
    } catch (err) {
        next(err);
    }
});

router.put('/:doctorID', authenticate, async (req, res, next) => {
    try {
        const { namaDoctor } = req.body;
        const Doctors = await Doctor.findByPk(req.params.doctorID);
        if (Doctors) {
            Doctors.namaDoctor = namaDoctor;
            await Doctors.save();
            res.json(Doctors);
        } else {
            res.status(404).json({ message: 'Doctor tidak ada' });
        }
        } catch (err) {
            next(err);
        }
   });

router.delete('/:doctorID', authenticate, async (req, res, next) => {
    try {
        const Doctors = await Doctor.findByPk(req.params.doctorID);
        if (Doctors) {
            await Doctors.destroy();
            res.json({ message: 'Doctor dihapus' });
        } else {
            res.status(404).json({ message: 'Doctor tidak ada' });
        }
    } catch (err) {
        next(err);
    }
});
module.exports = router;
