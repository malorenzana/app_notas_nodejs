const express = require('express');
const router = express.Router();
const User = require('../models/User')
const passport = require('passport')


//TODO ruta para renderizar el formulario
router.get('/users/signin', (req, res) => {
    res.render('users/signin')
});

//aplica la logica del archivo config/passport
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

//TODO Ruta para obtener la vista del Register
router.get('/users/signup', (req, res) => {
    res.render('users/signup')
});

//TODO methodo para REGISTRAR los usuarios en la DB
router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = []

    if (name.length <= 0) {
        errors.push({ text: 'Ingresa un nombre' })
    }
    if (password != confirm_password) {
        errors.push({ text: 'Contraseñas no Coinciden' })
    }
    if (password.length < 4) {
        errors.push({ text: 'Contraseñas debe ser mayor a 4 caracteres' })
    }

    const emailUser = await User.findOne({ email: email });

    if (emailUser) {
       
        errors.push({ text: 'correo ya existe' })
        // res.redirect('/users/signup');
       
    } else {
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Registrado Correctamente');
        res.redirect('/users/signin');
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
        console.log("aaaaaaaaa")
        console.log(errors)

    } 
});

// //Todo cierre de session (passport)
router.get('/users/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;


