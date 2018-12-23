'use strict';
const jwt = require('jsonwebtoken');

// Middleware de autenticación JWT
module.exports = () => {
    return (req, res, next) => {
        // Recoger token
        const token = req.body.jwttoken || req.query.jwttoken || req.get('x-access-jwttoken');

        // Validar token
        if (!token) {
            const err = new Error(res.__('no-token-provided'));
            err.status = 401;
            next(err);
            return;
        }

        // Verificar token
        jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
            if (err) {
                const error = new Error(res.__('invalid-token'));
                error.status = 401;
                next(error);
                return;
            }

            // Añadir el identificador de usuario al request
            req.user_id = decodedToken.user_id;
            next();
        });
    }
};