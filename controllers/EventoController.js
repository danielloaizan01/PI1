const Evento = require('../models/Evento')

// Lista de eventos
const index = (req, res, next) => {
    Evento.find()
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            })
        })
}

// Mostrar un evento
const show = (req, res, next) => {
    let eventoID = req.body.eventoID
    Evento.findById(eventoID)
        .then(response => {
            res.json({
                response
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            })
        })
}

// Agregar un evento
const store = (req, res, next) => {
    let evento = new Evento({
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        hora: req.body.hora,
        aforo: req.body.aforo,
        //idevento: req.body.idevento
    })
    if(req.file){
        evento.imagen = req.file.path
    }
    evento.save()
        .then(response => {
            res.json({
                message: 'Evento agregado correctamente'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            })
        })
}

// Actualizar un evento
const update = (req, res, next) => {
    let eventoID = req.body.eventoID

    let updatedData = {
        titulo: req.body.titulo,
        imagen: req.body.imagen,
        descripcion: req.body.descripcion,
        fechaInicio: req.body.fechaInicio,
        fechaFin: req.body.fechaFin,
        hora: req.body.hora,
        aforo: req.body.aforo,
        //idevento: req.body.idevento
    }

    Evento.findByIdAndUpdate(eventoID, { $set: updatedData })
        .then(() => {
            res.json({
                message: 'Evento actualizado correctamente'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            })
        })
}

// Eliminar un evento
const destroy = (req, res, next) => {
    let eventoID = req.body.eventoID

    Evento.findByIdAndRemove(eventoID)
        .then(() => {
            res.json({
                message: 'Evento eliminado'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            })
        })
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}