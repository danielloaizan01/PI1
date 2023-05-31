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
      password: hashedPass
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
  var usernombre = req.body.usernombre;
  var password = req.body.password;

  UserN.findOne({ $or: [{ correo: usernombre }, { telefono: usernombre }] })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'No user found! :c'
        });
      }

      bcrypt.compare(password, user.password, function(err, result) {
        if (err) {
          return res.status(500).json({
            error: err
          });
        }

        if (result) {
          let token = jwt.sign({ name: user.nombre }, 'AzQ,PI)0(', { expiresIn: '1h' });
          let refreshToken = jwt.sign({ name: user.nombre }, 'refreshtokenensecret', { expiresIn: '12h' });

          res.status(200).json({
            message: 'Login successful',
            token,
            refreshToken
          });
        } else {
          res.status(200).json({
            message: 'Password does not match!'
          });
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred!'
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

    let token = jwt.sign({ name: decode.nombre }, 'AzQ,PI)0(', { expiresIn: '1h' });
    let newRefreshToken = jwt.sign({ name: decode.nombre }, 'refreshtokensecret', { expiresIn: '12h' });

    res.status(200).json({
      message: 'Token refreshed successfully',
      token,
      refreshToken: newRefreshToken
    });
  });
};

// Traer mis datos
const show = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }

  jwt.verify(token, 'AzQ,PI)0(', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token de autenticación inválido' });
    }

    const usuarioID = decoded.name; // Ajusta el nombre del campo del token que contiene el ID del usuario
    UserN.findById(usuarioID)
      .then(response => {
        if (!response) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({
          response
        });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Ocurrió un error al obtener los datos del usuario'
        });
      });
  });
};


// Actualizar usuario
const update = (req, res, next) => {
  let usuarioID = req.body.usuarioID;

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

  UserN.findByIdAndUpdate(usuarioID, { $set: updatedData })
    .then(() => {
      res.json({
        message: 'Usuario actualizado correctamente'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Ha ocurrido un error'
      });
    });
};

// Eliminar usuario
const destroy = (req, res, next) => {
  let usuarioID = req.body.usuarioID;
  UserN.findByIdAndRemove(usuarioID)
    .then(() => {
      res.json({
        message: 'Usuario eliminado'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred!'
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
