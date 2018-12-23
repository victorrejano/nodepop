'use strict';

const mongoose = require('mongoose');

// Si se produce un error de conexión, finalizará la app
mongoose.connection.on('error', (err) => {
    console.log('Mongoose - Connection error', err);
    process.exit(1);
});

mongoose.connection.once('open', () => {
    console.log('Connection successfully to', mongoose.connection.name)
});

// Conexión indicando la bd
mongoose.connect('mongodb://localhost/' + process.env.DB_NAME, {useNewUrlParser: true} );

module.exports = mongoose.connection;