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

router.post('/', async (req, res, next) => {
    try {
        const {lastname, firstname, middlename, experience, post, firm} = req.body;
        const result = await Master.insertMaster(lastname, firstname, middlename, experience, post, firm);
        console.log(result);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/delete/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Master.deleteMasterById(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/info/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Master.getMasterForView(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
