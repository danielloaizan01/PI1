<<<<<<< HEAD
const mongoose = require('mongoose');
const eschema = mongoose.Schema;

const eventoSchema = new eschema({
    titulo: {
        type: String
    },
    imagen: {
        type: String
    },
    descripcion: {
        type: String
    },
    fechaInicio: {
        type: String
    },
    fechaFin: {
        type: String
    },
    hora: {
        type: String
    },
    aforo: {
        type: String
    }
}, { timestamps: true });

const Evento = mongoose.model('Evento', eventoSchema);
=======
const mongoose = require('mongoose');
const eschema = mongoose.Schema;

const eventoSchema = new eschema({
    titulo: {
        type: String
    },
    imagen: {
        type: String
    },
    descripcion: {
        type: String
    },
    fechaInicio: {
        type: String
    },
    fechaFin: {
        type: String
    },
    hora: {
        type: String
    },
    aforo: {
        type: String
    }
}, { timestamps: true });

const Evento = mongoose.model('Evento', eventoSchema);
>>>>>>> origin/main
module.exports = Evento;