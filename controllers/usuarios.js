const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuarioGet = async (req, res = response) =>{

    //recibir parametros por medio de un query
    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };

    // const usuarios = await Usuario.find( query )
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments( query );

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });

}

// Insertar un nuevo usuario
const usuarioPost = async (req, res = response) =>{

    // Informacion que viene del body, viene con el req
    const { nombre, correo, password, role } = req.body;

    // Crear un nuevo usuario
    const usuario = new Usuario( { nombre, correo, password, role } );

    // Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    // Guardar el nuevo usuario
    await usuario.save();

    res.json({
        usuario
    });

}

const usuarioPut = async (req, res = response) =>{

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync( password, salt );

    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        msg: 'Peticion PUT - desde controlador',
        usuario
    });
    
}

const usuarioDelete = async (req, res = response) =>{

    const { id } = req.params;

    // Eliminar fisicamente
    //const usuario = await Usuario.findByIdAndDelete( id );
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });
    const usuarioAutenticado = req.usuario;

    res.json({
        msg: 'Usuario eliminado',
        usuario,
        usuarioAutenticado
    });
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}