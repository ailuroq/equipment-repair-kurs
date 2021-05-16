const express = require('express');
const DeviceName = require('../controllers/DeviceName');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await DeviceName.getAllDeviceNames();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const name = req.body.name;
        const result = await DeviceName.createDeviceName(name);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const {ids} = req.body;
        const result = await DeviceName.deleteDeviceNames(ids);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const result = await DeviceName.updateDeviceName(id, name);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/problems/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await DeviceName.getPotentialProblems(id);
        console.log(result)
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const data = req.query.data;
        const result = await DeviceName.findDeviceNames(data);
        res.send(result);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
