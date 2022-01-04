const { Router } = require('express');
const { check } = require('express-validator');

const { usuarioGet, 
        usuarioPost, 
        usuarioPut, 
        usuarioDelete} = require('../controllers/usuarios');
        
const { validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole } = require('../middlewares');

const { esRoleValido, 
        elCorreoExiste, 
        existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuarioGet);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y debe de ser más de 6 letras').isLength({ min: 6 }).not().isEmpty(),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(elCorreoExiste),
        // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('role').custom(esRoleValido),
        validarCampos
], usuarioPost);

router.put('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('role').custom(esRoleValido),
        validarCampos
], usuarioPut);

router.delete('/:id', [
        validarJWT,
        //esAdminRole,
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuarioDelete);

module.exports = router;