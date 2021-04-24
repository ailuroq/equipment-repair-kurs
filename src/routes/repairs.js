const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await Repair.getAllRepairs();
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
