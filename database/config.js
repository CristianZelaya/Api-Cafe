const mongoose = require('mongoose');

const { MONGODE_ATLAS } = process.env;

const dbConexion = async () => {

    try {

        await mongoose.connect(MONGODE_ATLAS);

        console.log('Base de datos Online');
        
    } catch (error) {
        
        console.log(error);
        throw new Error('Error al levantar la base de datos');

    }

}

module.exports = {

    dbConexion

}