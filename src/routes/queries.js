const express = require('express');

const router = express.Router();

const FirstQuery = require('../controllers/FirstQuery');
const SecondQuery = require('../controllers/SecondQuery');
const ThirdQuery = require('../controllers/ThirdQuery');

const Query = require('../controllers/Query');

router.get('/first/info', async (req, res, next) => {
    try {
        const result = await FirstQuery.getQueryInfo();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/first', async (req, res, next) => {
    try {
        const firmId = req.query.firmId;
        const result = await FirstQuery.getTableByQuery(firmId);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/second', async (req, res, next) => {
    try {
        const result = await SecondQuery.getTableByQuery();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/third', async (req, res, next) => {
    try {
        const {month, year} = req.query;
        const result = await ThirdQuery.getTableByQuery(month, year);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/orders_by_master_per_period', async (req, res, next) => {
    try {
        const {masterId, from, to} = req.query;
        const resultDone = await Query.ordersDoneByMaster(masterId, from, to);
        const resultNotDone = await Query.ordersNotDoneByMaster(masterId, from, to);
        res.send({
            resultDone,
            resultNotDone
        });
    } catch (err) {
        next(err);
    }
});

router.get('/group_repairs_by_type', async (req, res, next) => {
    try {
        const result = await Query.groupRepairByType();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/count_masters_per_firms', async (req, res, next) => {
    try {
        const result = await Query.countMastersPerFirm();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/find_devices_by_brand', async (req, res, next) => {
    try {
        const result = await Query.findDevicesByBrand(req.query.brandId);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/list_not_made_orders', async (req, res, next) => {
    try {
        const result = await Query.notMadeOrders();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/no_orders_per_period', async (req, res, next) => {
    try {
        const {from, to} = req.query;
        const result = await Query.noOrderPerPeriod(from, to);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/count_orders_per_firm', async (req, res, next) => {
    try {
        const result = await Query.countOrdersPerFirm();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/group_devices_by_countries', async (req, res, next) => {
    try {
        const result = await Query.groupDevicesByCountries();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/group_orders_by_cities', async (req, res, next) => {
    try {
        const result = await Query.groupOrdersByCities();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/count_orders_per_period', async (req, res, next) => {
    try {
        const {id, from, to} = req.query;
        const result = await Query.countOrdersPerPeriod(from, to, id);
        console.log(result)
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/the_most_expensive_order', async (req, res, next) => {
    try {
        const result = await Query.theMostExpensiveOrder();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/masters_exp_more_avg', async (req, res, next) => {
    try {
        const result = await Query.mastersExpMoreAvg();
        res.send(result);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
