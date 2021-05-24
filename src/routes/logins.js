const express = require('express');

const router = express.Router();

const Login = require('../controllers/Login');

router.post('/', async (req, res, next) => {
    try {
        const result = await Login.login(req.body.login, req.body.password);
        if (result) res.sendStatus(200);
        if (!result) res.sendStatus(500);
    } catch (err) {
        next(err);
    }
});



module.exports = router;
