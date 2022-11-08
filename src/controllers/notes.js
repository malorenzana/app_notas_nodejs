const NoteSchema = require('../models/Notes');

//todo obtener la vista para crear una nueva nota
const getNewNote = async (req, res) => {
    res.render('notes/new-note')
};

//Todo creando nueva nota
const createNewNote = async (req, res) => {
        const { title, description } = req.body
        const newNote = new NoteSchema({ title, description });
        newNote.user = req.user._id;    //id del user para enlazarlo con la nota
        await newNote.save()
        req.flash('success_msg', 'Nota Guardada Correctamente')
        res.redirect('/notes')
    
};

//todo listar las notas del usuario que las creo(logeado)
const listNotes = async (req, res) => {
    const notes = await NoteSchema.find({user: req.user._id}).sort({ date: 'desc' }).lean();
    res.render('notes/all-notes', { notes });
};

//TODO obteniedo el registro y la vista para editarlo
const editNote = async (req, res) => {
    const note = await NoteSchema.findById(req.params.id).lean()
    res.render('notes/edit-note', { note })
};

//Todo metodo para actualizar un registro
const updateNote = async (req, res) => {
    const { title, description } = req.body;
    await NoteSchema.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Nota actualizada Correctamente')
    res.redirect('/notes');
};

//Todo eliminando un registro
const deleteNote = async (req, res) => {
    await NoteSchema.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Nota Eliminada')
    res.redirect('/notes');
}; 

module.exports = { getNewNote, createNewNote, listNotes, editNote, updateNote, deleteNote }