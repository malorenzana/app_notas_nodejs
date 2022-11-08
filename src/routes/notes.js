const express = require('express');
const router = express.Router();
const {validateNotes} =  require('../validators/notes')
const { isAuthenticated } = require('../helpers/auth')
const { 
    getNewNote, 
    createNewNote, 
    listNotes, 
    editNote, 
    updateNote, 
    deleteNote
}= require('../controllers/notes')

//TODO listando todas las notas
router.get('/notes', isAuthenticated, listNotes);

//TODO vista del formulario para una nueva nota
router.get('/notes/add',isAuthenticated, getNewNote)

//TODO metodo para crear una nota
router.post('/notes/new-note', isAuthenticated, validateNotes, createNewNote);

//TODO obteniendo el registro para actualizar
router.get('/notes/edit/:id', isAuthenticated, editNote);

//TODO actualizando el registro obtenido
router.put('/notes/edit-note/:id', isAuthenticated, updateNote);

//TODO eliminando un registro
router.delete('/notes/delete/:id', isAuthenticated, deleteNote);

module.exports = router;
