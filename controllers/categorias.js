const { response } = require("express");
const { Categoria } = require("../models");

// obtenerCategorias - Paginado - total - populate
const obtenerCategorias = async ( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query ).populate('usuario', 'nombre')
            .skip( Number(desde) )
            .limit( Number(limite) )
    ]);

    res.json({
        total,
        categorias
    })

}

// obtenerCategoria - populate
const obtenerCategoria = async ( req, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findById( id ).populate('usuario', 'nombre');

    if( categoria.estado === false ) {

        return res.status( 400 ).json({
            msg: 'La categoria no existe o esta bloqueada'
        });

    }

    res.json({
        categoria
    });

}

const crearCategoria = async ( req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne( { nombre } );

    if( categoriaDB ) {

        return res.status( 400 ).json({
            msg: `La categoria ${nombre} ya existe`
        });

    }

    // Generar data para guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    await categoria.save();

    res.json({
        categoria
    });

}

// actualizarCategoria
const actualizarCategoria = async ( req, res = response ) => {

    const { id } = req.params;
    const { _id, estado, usuario, ...data } = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true });

    res.json({
        msg: 'Categoria Actualizado',
        categoria
    });

}

// borrarCategoria
const borrarCategoria = async ( req, res = response ) => {

    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } );
    const usuarioAutenticado = req.usuario;

    res.json({
        msg: 'Categoria eliminada',
        categoria,
        usuarioAutenticado
    });

}

module.exports = {

    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria

}