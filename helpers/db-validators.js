const Rol = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async ( role = '' ) => {

    const existeRole = await Rol.findOne( { role } );
    
    if ( !existeRole ) {

         throw new Error(`El rol ${role} no esta registrado en la base de datos`);

    }

}

const elCorreoExiste = async ( correo = '' ) => {

    // verificar si el correo ya existe
    const existeCorreo = await Usuario.findOne( { correo } );

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
    esRoleValido,
    elCorreoExiste,
    existeUsuarioPorId
}