const { response } = require("express");
const { isValidObjectId } = require("mongoose");

const { Usuario, 
        Categoria, 
        Producto } = require("../models");

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'rols',
    'usuarios'
];

const buscarUsuarios = async ( termino = '', res = response ) => {

    // verifica si es un mondoID
    const esMongoID = isValidObjectId( termino ); // true

    if( esMongoID ) {

        const usuario = await Usuario.findById(termino);
        return res.json({

            resultado: ( usuario ) ? [ usuario ] : []

        });
        
    }

    // expresion regular para buscar minuscular o terminos similares
    const regex = new RegExp( termino, 'i' );

    const query = {
        $or: [ { nombre: regex }, { correo: regex } ],
        $and: [ { estado: true } ]
    };

    const [ total, usuarios ] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
    ]);

    res.json({
        total,
        resultados: ( usuarios ) ? [ usuarios ] : []
    });

}

const buscarCategorias = async ( termino = '', res = response ) => {

    // verifica si es un mondoID
    const esMongoID = isValidObjectId( termino ); // true

    if( esMongoID ) {

        const categoria = await Categoria.findById(termino);
        return res.json({

            resultado: ( categoria ) ? [ categoria ] : []

        });
        
    }

    const regex = new RegExp( termino, 'i');

    const categoria = await Categoria.find({ nombre: regex, estado: true });

    res.json({
        resultados: ( categoria ) ? categoria : []
    });

}

const buscarProductos = async ( termino = '', res = response ) => {

    
    // verifica si es un mondoID
    const esMongoID = isValidObjectId( termino ); // true

    if( esMongoID ) {

        const producto = await Producto.findById(termino).populate('categoria', 'nombre');

        return res.json({

            resultado: ( producto ) ? [ producto ] : []

        });
        
    }

    const regex = new RegExp( termino, 'i');

    const productos = await Producto.find({ nombre: regex, estado: true })
                                    .populate('categoria', 'nombre');

    res.json({
        resultados: ( productos ) ? productos : []
    });

}

const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;

    if( !coleccionesPermitidas.includes( coleccion ) ) {

        return res.status( 400 ).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });

    }

    switch ( coleccion ) {

        case 'categorias':
            buscarCategorias( termino, res );
            break;

        case 'productos':
            buscarProductos( termino, res );
            break;

        case 'usuarios':
            buscarUsuarios( termino, res );
            break;
        
        default:
            res.status( 500 ).json({
                msg: 'Se le olvido hacer esta búsqueda'
            })
    
    }

}

module.exports = {

    buscar

}