const { response } = require("express")

const esAdminRole = ( req, res = response, next ) => {

    if( !req.usuario ) {

        return res.status( 500 ).json( {
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });

    }

    const { role, nombre } = req.usuario;

    if( role !== 'ADMIN_ROLE' ) {

        return res.status( 401 ).json( {
            msg: `Usuario ${nombre} no esta autorizado para realizar esta acción`
        });

    }

    next();

}

const tieneRole = ( ...rols ) => {

    return ( req, res = response, next ) => {

        if( !req.usuario ) {

            return res.status.json( {
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });

        }

        if ( !rols.includes( req.usuario.role ) ) {

            return res.status( 401 ).json( {
                msg: `El servicio requiere uno de estos roles ${rols}`
            });

        }

        next();

    }

}

module.exports = {

    esAdminRole,
    tieneRole

}