const express = require('express');

const router = express.Router();

const SecondQuery = require('../controllers/SecondQuery');
const ThirdQuery = require('../controllers/ThirdQuery');

router.get('/first', async (req, res, next) => {
    try {
        const result = await Query.firstQuery();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/second', async (req, res, next) => {
    try {
        const result = await SecondQuery.getTableByQuery();
        console.log(result);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/second/2', async (req, res, next) => {
    try {
        const result = await SecondQuery.getTableByQuery2();
        console.log(result);
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
