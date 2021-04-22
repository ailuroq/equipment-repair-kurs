const express = require('express')
const router = express.Router()
const Order = require('../controllers/Order')
router.get('/', async(req, res, next) => {
    try {
        const result = await Order.getAllOrders()
        res.send(result)
    } catch(err) {
        next(err)
    }
})

module.exports = router