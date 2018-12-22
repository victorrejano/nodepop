'use strict';

const mongoose = require('mongoose');

// Tags disponibles para anuncios
const allTags = ['mobile', 'work', 'lifestyle', 'motor'];

// Crear el schema
const adSchema = mongoose.Schema({
    name: {type: String, index: true},
    forSale: Boolean,
    price: {type: Number, index: true},
    image: String,
    tags: {
        type: [String],
        enum: allTags,
        index: true
    }
});

// Crear el modelo
const Ad = mongoose.model('Ad', adSchema);

// Exportar modelo
module.exports = Ad;