'use strict';
const jwt = require('jsonwebtoken');

// Middleware de autenticación JWT
module.exports = () => {
    return (req, res, next) => {
        // Recoger token
        const token = req.body.jwttoken || req.query.jwttoken || req.get('x-access-jwttoken');

        // Validar token
        if (!token) {
            const err = new Error('No token provided');
            err.status = 401;
            next(err);
            return;
        }

        // Verificar token
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                next(err);
                return;
            }

            // Añadir el identificador de usuario al request
            req.user_id = decodedToken.user_id;
            next();
        });
    }
};