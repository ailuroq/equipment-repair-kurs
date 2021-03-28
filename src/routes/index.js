const { Router } = require('express')
const router = Router()

router.use('/clients', require('./clients'))

module.exports = router