const express = require('express');
const Client = require('../controllers/Client');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const result = await Client.getAllClients();
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const {
            firstname,
            lastname,
            middlename,
            phone
        } = req.body;
        const result = await Client.createClient(lastname, firstname, middlename, phone);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const {
            firstname,
            lastname,
            middlename,
            phone
        } = req.body;
        const result = await Client.updateClientById(req.params.id, firstname, lastname, middlename, phone);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.get('/search', async (req, res, next) => {
    try {
        const { clientData } = req.query;
        const result = await Client.findClients(clientData);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.get('/info/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Client.getClientForView(id);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.post('/delete/:ids', async (req, res, next) => {
    try {
        const ids = req.params.ids;
        const result = await Client.deleteClientById(ids);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.get('/problems/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Client.getPotentialProblems(id);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const query = {};
        if (req.query.lastname) query.lastname = req.query.lastname;
        if (req.query.firstname) query.firstname = req.query.firstname;

        const result = await Client.findClients(query);
        res.send(result);
    }
    catch (err) {
        next(err);
    }
});

router.post('/update', async (req, res, next) => {
    try {
        const {id, lastname, firstname, middlename, phone} = req.body;
        const result = await Client.updateClientById(id, lastname, firstname, middlename, phone);
        res.send(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
