'use strict';

var express = require('express');
var router = express.Router();

const Ad = require('../../../models/Ad');

router.get('/', async (req, res, next) => {

    try {
        const list = await  Ad.find().exec();
        res.json({success: true, data: list});
    } catch (err) {
        next(err);
    }
});

module.exports = router;