<<<<<<< HEAD
const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')


router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/refresh-token', AuthController.refreshToken)

=======
const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')


router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.post('/refresh-token', AuthController.refreshToken)

>>>>>>> origin/main
module.exports = router