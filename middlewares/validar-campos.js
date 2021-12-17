const { validationResult } = require('express-validator');

// Muestra los errores
const validarCampos = ( req, res, next ) => {

    // Muestra los errores
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {

        return res.status( 400 ).json({
            errors
        });

    }

    next();

}

module.exports = {

    validarCampos

}