//TODO para hacer Auth Local
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')

//definiendo la auth, luego usarse en una ruta 
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        return done(null, false, { message: 'Usuario No Encontrado.' })
    } else {
        const match = await user.matchPassword(password);  //retorna true o false
        if (match) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password incorrecta' });
        }
    }
}));


//se logea y se guarda en una session al user.id
passport.serializeUser((user, done) => {
    done(null, user.id);
});


//generar un usuario para poder usar sus datos
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    }).lean();
});
