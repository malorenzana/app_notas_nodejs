const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper')


const validateNotes = [
    check('title', 'ingrese un titulo')
        .exists()
        .isString()
        .not()
        .notEmpty(),

    check('description', 'ingrese una descripcion')
        .exists()
        .isString()
        .not()
        .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    }    

     
    ] 


module.exports = {validateNotes}