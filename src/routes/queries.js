const express = require('express');

const router = express.Router();

const FirstQuery = require('../controllers/FirstQuery');
const SecondQuery = require('../controllers/SecondQuery');
const ThirdQuery = require('../controllers/ThirdQuery');

router.get('/first', async (req, res, next) => {
    try {
        const firmId = req.query.firmId;
        const result = await FirstQuery.getTableByQuery(firmId);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/second', async (req, res, next) => {
    try {
        const result = await SecondQuery.getTableByQuery();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/third', async (req, res, next) => {
    try {
        const {month, year} = req.query;
        const result = await ThirdQuery.getTableByQuery(month, year);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
