const { validationResult } = require('express-validator');


const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        const { title, description } = req.body
        const errors = [];
       
        if (!title) {
            errors.push({ text: 'Por favor escribir un titulo' })
        }
        if (title == Number) {
            errors.push({ text: 'solo acepta letras' })
        }
        if (!description) {
            errors.push({ text: 'Por favor escribir la descripcion' })
        }
        if (title.length < 3 ) {
            errors.push({ text: 'titulo debe ser mayor a 3' })
        }
        if (errors.length > 0) {
            res.render("notes/new-note", {
                errors,
                title,
                description
            })
        }
    }
}
module.exports = { validateResult }

