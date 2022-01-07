const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, 
        obtenerCategoria, 
        obtenerCategorias, 
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');

const { existeCategoria, 
        existeUsuarioPorId } = require('../helpers/db-validators');

const { validarCampos, 
        validarJWT, 
        esAdminRole} = require('../middlewares');

const router = Router();

// Obtener todas las categorias - get - publico
router.get('/', obtenerCategorias );

// Obtener una categoria - get - publico
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], obtenerCategoria );

// Crear categoria - post - privado cualquiera con token válido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );

// Actualizar categoria -put - privado cualquiera con token válido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], actualizarCategoria );

// Borrar categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria );

module.exports = router;