'use strict';

var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const User = require('../../../models/User');

/**
 * POST /api/v1/users/login
 * Login
 */
router.post('/login', async (req, res, next) => {

    try {

        // Credenciales de usuario
        const email = req.body.email;
        const password = req.body.password;

        // Buscar usuario
        const user = await User.findOne({ email: email}).exec();

        // Verificar usuario
        if (!user || !(bcrypt.compareSync(password, user.password))) {
            const err = new Error('Wrong credentials');
            err.status = 403;

            next(err);
            return;
        }

        // Crear token

        res.json({success : true});
    } catch (err) {
        next(err);
    }
});

/**
 * POST /api/v1/users
 */
router.post('/' , async (req, res, next) => {
    try {
        // Parámetros de API
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

        // Checkear datos
        if (email && name && password) {
            // Crear usuario
            const user = new User(req.body);

            // Hashear password
            const salt = bcrypt.genSaltSync(10);

            const hash = bcrypt.hashSync(user.password, salt);
            user.password = hash;

            // Guardar en db
            await user.save();

            // Devolver usuario guardado
            res.json({success : true, data : user});

        } else {
            res.json({success : false, error : 'Email, name and password are required'});
        }

    } catch (err) {
        next(err);
    }
});

module.exports = router;