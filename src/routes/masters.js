const express = require('express');
const Master = require('../controllers/Master');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await Master.getAllMasters();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/new', async (req, res, next) => {
    try {
        const result = await Master.getInsertInfo();
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {lastname, firstname, middlename, experience, post, firm} = req.body;
        const result = await Master.insertMaster(lastname, firstname, middlename, experience, post, firm);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/delete', async (req, res, next) => {
    try {
        const ids = req.body.ids;
        const result = await Master.deleteMasterById(ids);
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

router.get('/search', async (req, res, next) => {
    try {
        const data = req.query.data;
        const result = await Master.findMasters(data);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/problems/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await Master.getPotentialMasterDataToDelete(id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.get('/update/info/:id', async (req, res, next) => {
    try {
        const result = await Master.getUpdateMasterInfo(req.params.id);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const {id, lastname, firstname, middlename, firmId, postId} = req.body;
        const result = await Master.updateMaster(id, lastname, firstname, middlename, firmId, postId);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
