<<<<<<< HEAD
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'AzQ,PI)0(')

        req.user = decode
        next()
    }
    catch(error) {
        if(error.name == "TokenExpiredError") {
        res.status(401).json({
            message: 'Autthentication Failed'
        })
    } else {
        res.json({
            message: 'Authentication Failed!'
        })
      }
    }
}

=======
const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(' ')[1]
        const decode = jwt.verify(token, 'AzQ,PI)0(')

        req.user = decode
        next()
    }
    catch(error) {
        if(error.name == "TokenExpiredError") {
        res.status(401).json({
            message: 'Autthentication Failed'
        })
    } else {
        res.json({
            message: 'Authentication Failed!'
        })
      }
    }
}

>>>>>>> origin/main
module.exports = authenticate