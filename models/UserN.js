const mongoose = require('mongoose')
const eschema = mongoose.Schema

const userNSchema = new eschema({
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    cc:{
        type: String
    },
    correo:{
        type: String,
        required: true,
        unique: true
    },
    telefono:{
        type: String
    },
    edad:{
        type: String
    },
    sexo:{
        type: String
    },
    tipoVinculo:{
        type: String
    },
    formacion:{
        type: String
    },
    password: {
        type: String
    }
}, {timestamps:true})

const UserN = mongoose.model('UserN', userNSchema)
module.exports = UserN