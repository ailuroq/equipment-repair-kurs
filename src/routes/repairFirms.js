const express = require('express');

const router = express.Router();
const repairFirm = require('../controllers/RepairFirm');

router.get('/', async (req, res, next) => {
    try {
        const result = await repairFirm.getAllFirms();
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.get('/problems/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await repairFirm.getPotentialDeleteFirmProblems(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {
            name, address, phone, cityId
        } = req.body;
        const result = await repairFirm.createFirm(name, address, phone, cityId);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const {
            name, address, phone, cityId
        } = req.body;
        const result = await repairFirm.updateFirmById(req.params.id, name, address, phone, cityId);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const {name, address} = req.query;
        const result = await repairFirm.findFirms(name, address);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/info/:id', async (req, res, next) => {
    try {
        const result = await repairFirm.getFirmForView(req.params.id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/delete/', async (req, res, next) => {
    try {
        const ids = req.body.ids;
        const result = await repairFirm.deleteFirms(ids);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/problems/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await repairFirm.getPotentialDeleteFirmProblems(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.put('/update', async (req, res, next) => {
    try {
        const {id, name, address, phone, cityId} = req.body;
        const result = await repairFirm.updateFirmById(id, name, address, phone, cityId);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
