const UserN = require('../models/UserN');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }

    let user = new UserN({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      cc: req.body.cc,
      correo: req.body.correo,
      telefono: req.body.telefono,
      edad: req.body.edad,
      sexo: req.body.sexo,
      tipoVinculo: req.body.tipoVinculo,
      formacion: req.body.formacion,
      password: hashedPass,
      idtoken: req.body.idtoken
    });

    user.save()
      .then(user => {
        res.status(200).json({
          message: 'User Added Successfully'
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred!',
          error: error.message
        });
      });
  });
};

const login = (req, res, next) => {
  var usernombre = req.body.correo;
  var password = req.body.password;

  UserN.findOne({ $or: [{ correo: usernombre }, { telefono: usernombre }] })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, function(err, result) {
          if (err) {
            res.json({
              error: err
            });
          }
          if (result) {
            let token = jwt.sign({ userID: user._id, correo: user.correo }, 'AzQ,PI)0(', { expiresIn: '15m' });
            let refreshToken = jwt.sign({ userID: user._id, correo: user.correo }, 'refreshtokenensecret', { expiresIn: '10m' });

            UserN.findByIdAndUpdate(user._id, { idtoken: token }) // Actualizar el campo "idtoken" con el valor del token
              .then(() => {
                res.status(200).json({
                  message: 'Inicio de sesión exitoso',
                  token,
                  refreshToken
                });
              })
              .catch(error => {
                res.status(500).json({
                  message: 'Ocurrió un error al actualizar el campo "idtoken" en la base de datos',
                  error: error.message
                });
              });
          } else {
            res.status(200).json({
              message: 'La contraseña no coincide'
            });
          }
        });
      } else {
        res.json({
          message: 'No se encontró el usuario'
        });
      }
    })
    .catch(error => {
      res.json({
        message: 'Ocurrió un error',
        error: error.message
      });
    });
};


const refreshToken = (req, res, next) => {
  const refreshToken = req.body.refreshToken;
  jwt.verify(refreshToken, 'refreshtokensecret', function(err, decode) {
    if (err) {
      return res.status(400).json({
        err
      });
    }

    let token = jwt.sign({ name: decode.nombre }, 'AzQ,PI)0(', { expiresIn: '15m' });
    let newRefreshToken = jwt.sign({ name: decode.nombre }, 'refreshtokensecret', { expiresIn: '10m' });

    res.status(200).json({
      message: 'Token refreshed successfully',
      token,
      refreshToken: newRefreshToken
    });
  });
};

const show = (req, res, next) => {
  let idtoken = req.body.idtoken;
  UserN.findOne({ idtoken })
    .then(response => {
      if (!response) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json({ response });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Ocurrió un error al obtener los datos del usuario',
        error: error.message
      });
    });
};


// Actualizar usuario

const update = (req, res, next) => {
  let idtoken = req.body.idtoken;

  let updatedData = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    cc: req.body.cc,
    correo: req.body.correo,
    telefono: req.body.telefono,
    edad: req.body.edad,
    sexo: req.body.sexo,
    tipoVinculo: req.body.tipoVinculo,
    formacion: req.body.formacion
  };

  UserN.updateOne({ idtoken }, { $set: updatedData })
    .then(() => {
      res.json({
        message: 'Usuario actualizado correctamente'
      });
    })
    .catch(error => {
      res.json({
        message: 'Ha ocurrido un error',
        error: error.message
      });
    });
};

const destroy = (req, res, next) => {
  let idtoken = req.body.idtoken;

  UserN.findOneAndRemove({ idtoken })
    .then(() => {
      res.json({
        message: 'Usuario eliminado'
      });
    })
    .catch(error => {
      res.json({
        message: 'Ha ocurrido un error',
        error: error.message
      });
    });
};


module.exports = {
  register,
  login,
  refreshToken,
  show,
  update,
  destroy
};
