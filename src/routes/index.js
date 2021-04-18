const { Router } = require('express')
const router = Router()

router.use('/clients', require('./clients'))
router.use('/devices', require('./devices'))

module.exports = router