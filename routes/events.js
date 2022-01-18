const { Router } = require("express");
const { check } = require("express-validator");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { fieldValidators } = require("../middlewares/filed-validator");
const { validateJWT } = require("../middlewares/token-validator");

const router=Router();

router.use(validateJWT);

router.get('/', getEvents); 

router.post('/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de inicio es obligatoria').custom(isDate),
    fieldValidators

],

createEvent);

router.put('/:id',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de inicio es obligatoria').custom(isDate),
    fieldValidators
],
updateEvent);

router.delete('/:id', deleteEvent);
module.exports=router;