/*
Rutas de usuario /Auth
host= /api/auth
host: 
*/

const {Router}=require('express');
const {check} =require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { fieldValidators } = require('../middlewares/filed-validator');
const { validateJWT } = require('../middlewares/token-validator');
const router=Router();

router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email',"El email es obligatorio").not().isEmpty(),
    check('email',"No es un email valido").isEmail(),
    check('password',"El password debe ser mayor a 6 caracteres").isLength({min:6}),
    fieldValidators
    

],createUser);

router.post('/',[
    check('email','No es un email valido').isEmail(),
    check('password',"El password debe ser mayor a 6 caracteres").isLength({min:6}),
    fieldValidators
],
loginUser);

router.get('/renew',validateJWT,renewToken);

module.exports=router;