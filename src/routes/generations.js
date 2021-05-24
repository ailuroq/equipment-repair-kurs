import {fullGeneration} from "../scripts/data-generation";

const express = require('express');

const router = express.Router();

const Login = require('../controllers/Login');

router.post('/', async (req, res, next) => {
    try {
        await fullGeneration(1500);
        res.sendStatus(200)
    } catch (err) {
        next(err);
    }
});




module.exports = router;
