'use strict';

var express = require('express');
var router = express.Router();

const Ad = require('../../../models/Ad');
const jwtAuth = require('../../../lib/jwtAuth');

// Middleware de autenticación
router.use(jwtAuth());

/**
 * GET /api/v1/ads
 * Listado de anuncios filtrado
 */
router.get('/', async (req, res, next) => {

    try {
        const filter = {};

        // Obtener los parámetros de filtrado
        const tags = req.query.tags;
        const sale = req.query.forSale;
        const name = req.query.name;
        let skip = req.query.start;
        let limit = req.query.limit;
        const sort = req.query.sort;
        let price = req.query.price;

        if (tags) {
            filter.tags = {$in: tags}
        }
        if (sale) {
            filter.forSale = sale
        }
        if (name) {
            filter.name = new RegExp('^' + req.query.name, "i")
        }
        if (skip) {
            skip = parseInt(skip)
        }
        if (limit) {
            limit = parseInt(limit)
        }
        // TODO Filtrado por precio
        if (price) {
            filter.price = price;
        }

        // Query para la búsqueda filtrada
        const query = Ad.find(filter);
        query.skip(skip);
        query.limit(limit);
        query.sort(sort);

        // Ejecutar la query y obtener el resultado
        const list = await query.exec();

        // Enviar respusta
        res.json({success: true, data: list});
    } catch (err) {
        // Reportar error
        next(err);
    }
});

/**
 * GET /api/v1/ads/tags
 * Listado de tags disponibles
 */
router.get('/tags', (req, res, next) => {
    try {
        // Obtener listado de tags
        const list = Ad.allTags();

        // Enviar respuesta
        res.json({success: true, data: list});
    } catch (err) {
        // Reportar error
        next(err);
    }
});

module.exports = router;