const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

router.get('/', UsuarioController.index);
router.post('/show', UsuarioController.show);
router.post('/store', UsuarioController.store);
router.post('/update', UsuarioController.update);
router.post('/delete', UsuarioController.destroy);

module.exports = router;

