const Usuario= require('../models/Usuario')

//Lista de usuarios
const index = (req, res, next) => {
	Usuario.find()
	.then(response => {
		res.json({
			response
		})
	})
	.catch(error => {
		res.json({
			message: 'An error Ocurred!'
		})
	})
}

//Listar 1 usuario

const show = (req,res, next) => {
	let usuarioID = req.body.usuarioID
	Usuario.findById(usuarioID)
	.then(response => {
		res.json ({
			response
		})
	})
	.catch(error => {
		req.json({
			message: 'An error Ocurred!'
		}) 
	})
}

//agregar usuario
const store = (req, res, next) => {
    const correo = req.body.correo;

    // Verificar si el correo ya está registrado
    Usuario.findOne({ correo: correo })
        .then(existingUser => {
            if (existingUser) {
                // El correo ya está registrado, devolver un mensaje de error
                res.json({
                    message: 'El correo ya está registrado'
                });
            } else {
                // El correo no está registrado, guardar el usuario
                let usuario = new Usuario({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    cc: req.body.cc,
                    correo: correo,
                    telefono: req.body.telefono,
                    edad: req.body.edad,
                    sexo: req.body.sexo,
                    tipoVinculo: req.body.tipoVinculo,
                    formacion: req.body.formacion,
                });

                usuario.save()
                    .then(response => {
                        res.json({
                            message: 'Usuario agregado correctamente'
                        });
                    })
                    .catch(error => {
                        res.json({
                            message: 'Ocurrió un error al guardar el usuario'
                        });
                    });
            }
        })
        .catch(error => {
            res.json({
                message: 'Ocurrió un error al verificar el correo'
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
    index,show,store,update,destroy
}