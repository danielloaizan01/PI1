<<<<<<< HEAD
const express = require('express');
const router = express.Router();

const AuthNController = require('../controllers/AuthNController');

router.post('/register', AuthNController.register);
router.post('/login', AuthNController.login);
router.post('/show', AuthNController.show);
router.post('/update', AuthNController.update);
router.post('/delete', AuthNController.destroy);
router.post('/refresh-token', AuthNController.refreshToken);

=======
const express = require('express');
const router = express.Router();

const AuthNController = require('../controllers/AuthNController');

router.post('/register', AuthNController.register);
router.post('/login', AuthNController.login);
router.post('/show', AuthNController.show);
router.post('/update', AuthNController.update);
router.post('/delete', AuthNController.destroy);
router.post('/refresh-token', AuthNController.refreshToken);

>>>>>>> origin/main
module.exports = router;