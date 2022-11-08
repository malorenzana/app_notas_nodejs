const mongoose = require("mongoose")
const { Schema } = mongoose;


const NoteSchema = new Schema({
    title: { type: String, 
        required: true 
    },

    description: { 
        type: String, 
        required: true 
    },
    user: {
        type: String
    }
},
{
    timestamps: true, //todo crea los campos createdAt, updateAT
    versionKey: false,
}
);

module.exports = mongoose.model('Note', NoteSchema)