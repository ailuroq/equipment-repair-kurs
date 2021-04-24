const express = require('express');

const router = express.Router();
const Device = require('../controllers/Device');

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

module.exports = router;
