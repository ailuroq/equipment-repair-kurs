const express = require('express')
const router = express.Router()
const Client = require('../controllers/Client')

router.get('/', async (req, res, next) => {
    try {
        const result = await Client.getAllClients()
        res.send(result)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {firstname, lastname, middlename, phone} = req.body
        const result = await Client.createClient(firstname, lastname, middlename, phone)
        res.send(result)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const {firstname, lastname, middlename, phone} = req.body
        const result = await Client.updateClientById(req.params.id, firstname, lastname, middlename, phone)
        res.send(result)
    } catch (err) {
        next(err)
    }
})

router.get('/search', async (req, res, next) => {
    try {
        const clientData = req.query.clientData
        console.log(clientData)
        const result = await Client.find(clientData)
        res.send(result)
    } catch (err) {
        next(err)
    }
})

router.get('/info/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await Client.getClientForView(id)
        res.send(result)
    } catch (err) {
        next(err)
    }
})

router.post('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const result = await Client.deleteClientById(id)
        res.send(result)
    } catch (err) {
        next(err)
    }
})

router.get('/problems/:id', async(req, res, next) => {
    try {
        const id = req.params.id
        const result = await Client.getPotentialProblems(id)
        res.send(result)
    } catch (err) {
        next(err)
    }
})

module.exports = router