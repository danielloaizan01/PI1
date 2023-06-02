const Evento = require('../models/Evento');
const UserN = require('../models/UserN');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

// Lista de eventos
const index = (req, res, next) => {
  Evento.find()
    .then(response => {
      res.json({
        response
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};

// Mostrar un evento
const show = (req, res, next) => {
  let eventoID = req.body.eventoID;
  Evento.findById(eventoID)
    .then(response => {
      res.json({
        response
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};

// Agregar un evento
const store = (req, res, next) => {
  let evento = new Evento({
    titulo: req.body.titulo,
    imagen: req.body.imagen,
    descripcion: req.body.descripcion,
    fechaInicio: req.body.fechaInicio,
    fechaFin: req.body.fechaFin,
    hora: req.body.hora,
    aforo: req.body.aforo
  });
  if (req.file) {
    evento.imagen = req.file.path;
  }
  evento
    .save()
    .then(response => {
      res.json({
        message: 'Evento agregado correctamente'
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};

// Actualizar un evento
const update = (req, res, next) => {
  let eventoID = req.body.eventoID;

  let updatedData = {
    titulo: req.body.titulo,
    imagen: req.body.imagen,
    descripcion: req.body.descripcion,
    fechaInicio: req.body.fechaInicio,
    fechaFin: req.body.fechaFin,
    hora: req.body.hora,
    aforo: req.body.aforo
  };

  Evento.findByIdAndUpdate(eventoID, { $set: updatedData })
    .then(() => {
      res.json({
        message: 'Evento actualizado correctamente'
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};

// Eliminar un evento
const destroy = (req, res, next) => {
  let eventoID = req.body.eventoID;

  Evento.findByIdAndRemove(eventoID)
    .then(() => {
      res.json({
        message: 'Evento eliminado'
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred!'
      });
    });
};

const registerUser = (req, res, next) => {
    try {
      let eventoID = req.body.eventoID; // ID del evento
      let usuarioID = req.body.usuarioID; // ID del usuario que deseas registrar
  
      Evento.findById(eventoID)
        .exec()
        .then(evento => {
          if (!evento) {
            return res.status(404).json({
              message: 'Evento no encontrado'
            });
          }
  
          // Agregar el ID del usuario a la matriz de usuarios registrados
          evento.usuariosRegistrados.push(usuarioID);
  
          // Guardar el evento actualizado
          return evento.save();
        })
        .then(savedEvento => {
          return res.json({
            message: 'Usuario registrado exitosamente'
          });
        })
        .catch(error => {
          return res.status(500).json({
            message: 'Error al registrar el usuario en el evento',
            error: error.message // Capturamos el mensaje de error para enviarlo en la respuesta
          });
        });
    } catch (error) {
      return res.status(500).json({
        message: 'Error al procesar la solicitud',
        error: error.message // Capturamos el mensaje de error para enviarlo en la respuesta
      });
    }
  };
    



  const registerSinregistrar = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
      if (err) {
        return res.status(500).json({
          error: err
        });
      }
  
      let user = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cc: req.body.cc,
        correo: req.body.correo,
        telefono: req.body.telefono,
        edad: req.body.edad,
        sexo: req.body.sexo,
        tipoVinculo: req.body.tipoVinculo,
        formacion: req.body.formacion,
      });
  
      user.save()
        .then(user => {
          // Agregar el ID del usuario a la matriz de usuariosRegistrados del modelo Evento
          Evento.findByIdAndUpdate(req.body.eventoID, { $push: { usuariosRegistrados: user._id } })
            .then(() => {
              res.status(200).json({
                message: 'Usuario registrado y evento actualizado correctamente'
              });
            })
            .catch(error => {
              res.status(500).json({
                message: 'Ocurrió un error al actualizar el evento',
                error: error.message
              });
            });
        })
        .catch(error => {
          res.status(500).json({
            message: 'Ocurrió un error al registrar el usuario',
            error: error.message
          });
        });
    });
  };
  
const getUsersRegistered = (req, res, next) => {
    let eventoID = req.params.eventoID;
  
    Evento.findById(eventoID)
      .populate('usuariosRegistrados')
      .select('usuariosRegistrados -_id')
      .exec()
      .then(evento => {
        if (!evento) {
          return res.status(404).json({
            message: 'Evento no encontrado'
          });
        }
        res.json(evento.usuariosRegistrados);
      })
      .catch(error => {
        res.status(500).json({
          message: 'Error al obtener los usuarios registrados'
        });
      });
  };
  

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  registerUser,
  getUsersRegistered,
  registerSinregistrar
};
