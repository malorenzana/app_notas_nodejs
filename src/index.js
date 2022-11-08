const express = require('express');
const path = require('path');
const exphbs = require("express-handlebars");
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Initilizations
const app = express();
require('./database');  //conexion a db
require('./config/passport'); //archivo passport

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));    //accede a la carpeta views
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),    //usar la carpeta layouts 
    partialsDir: path.join(app.get('views'), 'partials'),   //usar la carpeta partials
    extname: '.hbs'
}))
app.set('view engine', '.hbs');  //motor plantillas .hbs

//Midlewares
app.use(express.urlencoded({extended: false})); //recibir data de cliente
app.use(methodOverride('_method'));  //usar method put, delete en las vistas hbs
app.use(session({   //manejo de sessiones usuarios
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize()); //usar passport
app.use(passport.session());
app.use(flash());


//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');    //mensajes para el usuario success
    res.locals.error_msg = req.flash('error_msg');    //mensajes para el usuario errores
    res.locals.error = req.flash('error');    //mesajes flash passport
    res.locals.user = req.user || null;    //saludo al ususario al hacer login
    next();
});

//Routes  alias 
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));  //acediendo a la carpeta public
 
//Server lizend
app.listen(app.get('port'), () => {
    console.log("server on port", app.get('port'));
});
