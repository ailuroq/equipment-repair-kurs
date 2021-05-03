const express = require('express');

const router = express.Router();
const Query = require('../controllers/Query');

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
        const result = await Query.secondQuery();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/third', async (req, res, next) => {
    try {
        const result = await Query.thirdQuery();
        res.send(result);
    } catch (err) {
        next(err);
    }
});
