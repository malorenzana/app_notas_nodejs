const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/notesdb-app', {
    useNewUrlParser: true
}).then(db => console.log('conexion exitosa'))
    .catch(err => console.log('error: ', err))