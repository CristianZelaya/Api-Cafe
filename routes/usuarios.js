const {Router} = require('express');
const { check } = require('express-validator');

const { usuarioGet, 
        usuarioPost, 
        usuarioPut, 
        usuarioDelete} = require('../controllers/usuarios');
        
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, elCorreoExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuarioGet);

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio y debe de ser más de 6 letras').isLength({ min: 6 }).not().isEmpty(),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom(elCorreoExiste),
        // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom(esRolValido),
        validarCampos
], usuarioPost);

router.put('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRolValido),
        validarCampos
], usuarioPut);

router.delete('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
], usuarioDelete);

module.exports = router;