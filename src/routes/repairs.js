const express = require('express');
const Repair = require('../controllers/Repair');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await Repair.getAllRepairs();
        console.log(result);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const result = await Repair.deleteRepairs();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
