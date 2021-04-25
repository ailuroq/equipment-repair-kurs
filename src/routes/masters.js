const express = require('express');
const Master = require('../controllers/Master');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await Master.getAllMasters();
        console.log(result);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/new', async (req, res, next) => {
    try {
        const result = await Master.getInsertInfo();
        console.log(result);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
