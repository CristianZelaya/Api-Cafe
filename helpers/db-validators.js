const { Categoria, 
        Rol, 
        Usuario, 
        Producto} = require('../models');

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

const existeCategoria = async ( id = '' ) => {

    // verificar si la categoria existe
    const existeCategoria = await Categoria.findById( id );

    if( !existeCategoria ) {
    
        throw new Error(`La categoria con el id ${id} no existe`);

    }

}

const existeProducto = async ( id = '' ) => {

    // verificar si el producto existe
    const existeProducto = await Producto.findById( id );

    if( !existeProducto ) {

        throw new Error(`El producto con el id ${id} no existe`);

    }

}

module.exports = {
    esRoleValido,
    elCorreoExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto
}