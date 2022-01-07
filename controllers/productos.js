const { response } = require("express");
const { Producto } = require("../models");

const crearProducto = async ( req, res = response ) => {

    const { estado, usuario, ...body } = req.body;

    const productoDB = await Producto.findOne( { nombre: body.nombre } );

    if( productoDB ) {

        return res.status( 400 ).json({
            msg: `El producto ${nombre} ya existe`
        });

    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto( data );

    await producto.save(),

    res.json({
        msg: 'Producto Insertado',
        producto
    });

}

const obtenerProductos = async ( req, res = response ) => {

    const { limite = 5, desde = 0} = req.query;

    const query = { estado: true, disponible: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query ).populate('categoria', 'nombre').populate('usuario', 'nombre')
            .skip( Number( desde ) )
            .limit( Number( limite ) )
    ]);

    res.json({
        msg: 'Productos',
        total,
        productos
    });

}

const obtenerProducto = async ( req, res = response ) => {

    const { id } = req.params;

    const producto = await Producto.findById( id ).populate('categoria', 'nombre').populate('usuario', 'nombre');

    if( producto.estado === false || producto.disponible === false) {

        return res.status( 400 ).json({
            msg: 'El producto no existe o esta no esta disponible'
        });

    }

    res.json({
        producto
    });

}

const actualizarProducto = async ( req, res = response ) => {

    const { id } = req.params;
    const { _id, estado, usuario, ...data} = req.body;

    if( data.nombre ) {

        data.nombre = data.nombre.toUpperCase();

    }

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true } );

    res.json({
        msg: 'Producto Actualizado',
        producto
    });

}

const borrarProducto = async ( req, res = response ) => {

    const { id } = req.params;

    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true } );
    const usuarioAutenticado = req.usuario;

    res.json({
        msg: 'Categoria eliminada',
        producto,
        usuarioAutenticado
    });

}

module.exports = {

    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto

}