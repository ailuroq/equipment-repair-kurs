const express = require('express');
const Work = require('../controllers/Work');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await Work.getAllWorks();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const name = req.body.name;
        const result = await Work.createWork(name);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const {ids} = req.body;
        const result = await Work.deleteWorks(ids);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const result = await Work.updateWork(id, name);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/problems/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Work.getPotentialCountryDataToDelete(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
