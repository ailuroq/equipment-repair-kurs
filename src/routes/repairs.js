const express = require('express');
const Repair = require('../controllers/Repair');
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

router.post('/', async (req, res, next) => {
    try {
        const {orderId, workId, completion, price} = req.body;
        const result = await Repair.insertRepair(orderId, workId, completion, price);
        res.send(result);
    } catch (err) {
        next(err);
    }
});


router.get('/search', async (req, res, next) => {
    try {
        const {data} = req.query;
        const result = await Repair.findRepairs(data);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/info/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Repair.getRepairForView(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const ids = req.params.ids;
        const result = await Repair.deleteRepairs(ids);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const {id, workId, orderId, completion, price} = req.body;
        const result = await Repair.updateRepair(id, workId, orderId, completion, price);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/new', async(req, res, next) => {
    try {
        const result = await Repair.getInsertRepairInfo();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/update/info/:id', async (req, res, next) => {
    try {
        const result = await Repair.getUpdateRepairInfo(req.params.id);
        console.log(result)
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
