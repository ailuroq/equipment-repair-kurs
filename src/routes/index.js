const { Router } = require('express');

const router = Router();

router.use('/clients', require('./clients'));
router.use('/devices', require('./devices'));
router.use('/repair-firms', require('./repairFirms'));
router.use('/masters', require('./masters'));
router.use('/orders', require('./orders'));
router.use('/repairs', require('./repairs'));

module.exports = router;
