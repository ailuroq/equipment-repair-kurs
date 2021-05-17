const express = require('express');

const router = express.Router();
const Device = require('../controllers/Device');
const uploadFileMiddleware = require('../middlewares/upload');

router.get('/', async (req, res, next) => {
    try {
        const result = await Device.getAllDevices();
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.get('/delete/info/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Device.getPotentialDataToDelete(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const { ids } = req.body;
        const result = await Device.deleteDevicesById(ids);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/new', async (req, res, next) => {
    try {
        const result = await Device.getInsertDeviceInfo();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {nameId, countryId, clientId, brandId, model} = req.body;
        const result = await Device.insertDevice(nameId, countryId, clientId, brandId, model);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/info/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Device.getDeviceForView(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/edit-info/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Device.getUpdateDeviceInfo(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update-photo/:id', uploadFileMiddleware, async (req, res, next) => {
    try {
        const result = await Device.updateDevicePhoto(req.filename, req.params.id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const {name, country, client, brand, model} = req.body;
        const result = await Device.updateDeviceById(id, name, country, client, brand, model);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const result = await Device.findDevices(req.query.deviceData);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/problems/:id', async (req, res, next) => {
    try {
        const result = await Device.getPotentialDataToDelete(req.params.id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
