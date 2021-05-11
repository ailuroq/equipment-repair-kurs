const express = require('express');
const Brand = require('../controllers/Brand');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await Brand.getAllBrands();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const name = req.body.name;
        const result = await Brand.createBrand(name);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const {ids} = req.body;
        const result = await Brand.deleteBrands(ids);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const result = await Brand.updateBrand(id, name);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/problems/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        console.log(id)
        const result = await Brand.getPotentialProblems(id);
        console.log(result)
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const data = req.query.data;
        const result = await Brand.findBrands(data);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
