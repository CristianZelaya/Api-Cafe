const { response, json } = require('express');
const bcrypt = require('bcryptjs');

const { Usuario } = require('../models');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

const login = async ( req, res = response ) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne( { correo } );

        if ( !usuario ) {

            return res.status( 400 ).json({
                msg: 'Usuario / Password no son correctos - correo'
            });

        }

        //Si el usuario esta activo
        if ( !usuario.estado ) {

            return res.status( 400 ).json({
                msg: 'Usuario / Password no son correctos - estado false'
            });

        }

        // Verificar la contraseña
        const validarPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validarPassword ) {

            return res.status( 400 ).json({
                msg: 'Usuario / Password no son correctos - Password'
            });

        }

        // Generar el JWT
        const token = await generarJWT( usuario._id );
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            msg:'Hable con el administrador'
        });

    }


}

const googleSingIn = async ( req, res = response ) => {

    const { id_token } = req.body;

    try {

        const { nombre, correo, img } = await googleVerify( id_token );

        let usuario = await Usuario.findOne( { correo } );

        if( !usuario ) {

            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                role: 'USER_ROLE',
                password: ':P',
                img,
                google: true

            }

            usuario = new Usuario( data );

            await usuario.save();

        }

        // Si el usuario en DB esta eliminado
        if( !usuario.estado ) {

            return res.status( 401 ).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });

        }
        
        // Generar el JWT
        const token = await generarJWT( usuario._id );
        
        res.json({
            usuario,
            token
        });

    } catch (error) {

        res.status( 400 ).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        });
        
    }


}

module.exports = {
    login,
    googleSingIn
}