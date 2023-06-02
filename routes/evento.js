const express = require('express');
const router = express.Router();

const EventoController = require('../controllers/EventoController');
const upload = require('../middleware/upload')
const authenticate = require('../middleware/authenticate')

router.get('/', EventoController.index);
router.post('/show', EventoController.show);
router.post('/store', authenticate,upload.single('imagen'),EventoController.store);
router.post('/update', authenticate,EventoController.update);
router.post('/destroy', authenticate,EventoController.destroy);
router.post('/register/user', EventoController.registerUser);
router.post('/register/sinregistrar', EventoController.registerSinregistrar);
router.get('/:eventoID/usuariosRegistrados', authenticate, EventoController.getUsersRegistered);

module.exports = router;