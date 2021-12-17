const { Schema, model } = require('mongoose');

const RolsSchema = Schema({
    rol: {
        type: String,
        require: [true, 'El rol es obligatorio']
    }
});

module.exports = model( 'Rol', RolsSchema );