const { Usuario } = require('../models');
const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = async ( req, res = response, next ) => {

    const token = req.header('x-token');

    if( !token ) {

        return res.status( 401 ).json( {
            msg: "No hay token en la petición"
        });

    }

    try {

        const { SECRETORPRIVATEKEY } = process.env;

        const { uid } = jwt.verify( token, SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        // verificar si existe el usuario
        if( !usuario ) {

            return res.status( 401 ).json({
                msg: 'Token no válido'
            });

        }

        // verificar si el usuario esta true
        if( !usuario.estado ) {

            return res.status( 401 ).json({
                msg: 'Token no válido'
            });

        }

        req.usuario = usuario;
            
        next();

    } catch (error) {
        
        console.log(error);

        res.status( 401 ).json({
            msg: "Token no válido"
        });

    }

}

module.exports = {

    validarJWT

}