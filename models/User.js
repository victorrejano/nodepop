'use strict';

const mongoose = require('mongoose');

// Crear el schema
const userSchema = mongoose.Schema({
    name: {type: String, index: true},
    email: {type: String, index: true},
    password: String
});

// Crear el modelo
const User = mongoose.model('User', userSchema);

// Exportar modelo
module.exports = User;