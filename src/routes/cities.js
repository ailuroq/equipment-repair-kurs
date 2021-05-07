const express = require('express');
const City = require('../controllers/City');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await City.getAllCities();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const name = req.body.name;
        const result = await City.createCity(name);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const {ids} = req.body;
        const result = await City.deleteCities(ids);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const result = await City.updateCity(id, name);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/problems/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await City.getPotentialCityDataToDelete(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
