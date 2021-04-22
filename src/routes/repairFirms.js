const express = require('express')
const router = express.Router()
const repairFirm = require('../controllers/RepairFirm')

router.get('/', async(req, res, next) => {
    try {
        const result = await repairFirm.getAllFirms()
        res.send(result)
    } catch(err) {
        next(err)
    }
})

module.exports = router