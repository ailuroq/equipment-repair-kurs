const express = require('express');

const router = express.Router();
const Order = require('../controllers/Order');

router.get('/', async (req, res, next) => {
    try {
        const result = await Order.getAllOrders();
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.get('/problems/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const result = await Order.getPotentialOrderDataToDelete(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {
            receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId
        } = req.body;
        const result = await Order.insertOrder(receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/search', async (req, res, next) => {
    try {
        const {findData} = req.query;
        const result = await Order.findOrders(findData);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const {
            receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId
        } = req.body;
        const result = await Order.updateOrderById(id, receiptNumber, orderDate, completionDate, orderCompleted, deviceId, masterId);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/info/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Order.getOrderForView(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/new', async (req, res, next) => {
    try {
        const result = await Order.getInsertOrderInfo();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/update/info/:id', async (req, res, next) => {
    try {
        const result = await Order.getUpdateOrderInfo(req.params.id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
