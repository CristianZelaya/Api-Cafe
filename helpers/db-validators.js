const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolValido = async ( rol = '' ) => {

    const existeRol = await Rol.findOne( { rol } );

    if ( !existeRol ) {

         throw new Error(`El rol ${rol} no esta registrado en la base de datos`);

    }

}

const elCorreoExiste = async ( correo = '' ) => {

    // verificar si el correo ya existe
    const existeCorreo = await Usuario.findOne({ correo });

    if( existeCorreo ) {
    
        throw new Error(`El correo ${correo} ya esta registrado`);

    }

}

const existeUsuarioPorId = async ( id = '' ) => {

    // verificar si el correo ya existe
    const idExiste = await Usuario.findById( id );

    if( !idExiste ) {
    
        throw new Error(`El usuario con el id ${id} no existe`);

    }

}

module.exports = {
    esRolValido,
    elCorreoExiste,
    existeUsuarioPorId
}