'use strict';
require('../lib/connection');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

// Modelo
const Ad = require('../models/Ad');
const User = require('../models/User');

// Eliminar colecciones existentes
Ad.collection.drop();
User.collection.drop();

// Leer datos de prueba de anuncios
let filePath = path.join('mocks', 'ads.json');
fs.readFile(filePath, {encoding: 'utf8'}, async (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    try {
        // Extraer datos de json
        data = await JSON.parse(data);

        // Cargar datos de anuncios
        await Ad.collection.insertMany(data.ads, (err, doc) => {
            if (err) {
                console.log(err);
                return;
            }
        });

    } catch (e) {
        console.log(e);
    }
});

// Cargar datos de prueba de usuario
filePath = path.join('mocks', 'users.json');
fs.readFile(filePath, {encoding: 'utf8'}, async (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    try {
        // Extraer datos de json
        data = await JSON.parse(data);

        // Cargar datos de usuario
        data.users.forEach((element) => {
            const user = new User(element);

            // Hashear password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(user.password, salt);
            user.password = hash;

            // Almacenar usuario
            user.save();
        });
    } catch (e) {
        console.log(e);
    }
});


