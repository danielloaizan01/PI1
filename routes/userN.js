const express = require('express');
const router = express.Router();

const AuthNController = require('../controllers/AuthNController');
const authenticate = require('../middleware/authenticate')

router.post('/register', AuthNController.register);
router.post('/login', AuthNController.login);
router.post('/show', AuthNController.show);
router.post('/update', AuthNController.update);
router.post('/delete', AuthNController.destroy);
router.post('/refresh-token', AuthNController.refreshToken);

module.exports = router;