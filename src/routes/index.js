const { Router } = require('express');

const router = Router();

//main tables
router.use('/clients', require('./clients'));
router.use('/devices', require('./devices'));
router.use('/firms', require('./repairFirms'));
router.use('/masters', require('./masters'));
router.use('/orders', require('./orders'));
router.use('/repairs', require('./repairs'));

//references tables
router.use('/brands', require('./brands'));
router.use('/cities', require('./cities'));
router.use('/countries', require('./countries'));
router.use('/posts', require('./posts'));
router.use('/works', require('./works'));
router.use('/device-names', require('./deviceNames'));

//queries tables
router.use('/complex-queries', require('./queries'));

//diagrams
router.use('/diagrams', require('./diagrams'));


module.exports = router;
