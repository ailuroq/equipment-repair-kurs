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
            orderDate, completionDate, orderCompleted, deviceId, masterId
        } = req.body;
        const result = await Order.insertOrder(orderDate, completionDate, orderCompleted, deviceId, masterId);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const {data} = req.query;
        console.log(data)
        const result = await Order.findOrders(data);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const {
            orderDate, completionDate, orderCompleted, deviceId, masterId
        } = req.body;
        const result = await Order.updateOrderById(id, orderDate, completionDate, orderCompleted, deviceId, masterId);
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

router.post('/delete', async (req, res, next) => {
    try {
        const ids = req.body.ids;
        const result = await Order.deleteOrders(ids);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
