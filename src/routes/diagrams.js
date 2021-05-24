const express = require('express');
const Diagram = require('../controllers/Diagram');

const router = express.Router();

router.get('/1d', async (req, res, next) => {
    try {
        const result = await Diagram.get1DDiagram();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/2d', async (req, res, next) => {
    try {
        const result = await Diagram.get2DDiagram();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/3d', async (req, res, next) => {
    try {
        const cityId = req.query.cityId;
        const result = await Diagram.get3DDiagram(cityId);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
