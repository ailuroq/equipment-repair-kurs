const express = require('express');

const router = express.Router();
const Device = require('../controllers/Device');
const uploadFileMiddleware = require('../middlewares/upload');

router.get('/', async (req, res, next) => {
    try {
        const result = await Device.getAllDevices();
        console.log(result);
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
        const {name, countryId, photo, clientId, brandId, model} = req.body;
        const result = await Device.insertDevice(name, countryId, photo, clientId, brandId, model);
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
        res.send(200);
    } catch (err) {
        next(err);
    }
});

router.post('/update/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Device.updateDeviceById(id);
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

module.exports = router;
