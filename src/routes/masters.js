const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await Master.getAllMasters();
        console.log(result);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
