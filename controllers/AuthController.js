const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            res.json({
                error: err
            });
        }

        let user = new User({
            nombre: req.body.nombre,
            correo: req.body.correo,
            cc: req.body.cc,
            password: hashedPass
        });

        
        user.save()
            .then(user => {
                res.json({
                    message: 'User Added Successfully'
                });
            })
            .catch(error => {
                res.json({
                    message: 'An error occurred!'
                })
            })
    })
}

const login = (req, res, next) => {
    var usernombre = req.body.usernombre;
    var password = req.body.password;

    User.findOne({ $or: [{ correo: usernombre }, { telefono: usernombre }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) {
                        res.json({
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
            } else {
                res.json({
                    message: 'No user found!'
                });
            }
        })
        .catch(error => {
            res.json({
                message: 'An error occurred!'
            });
        });
};

const refreshToken = (req, res,next) => {
    const refreshToken = req.body.refreshToken
    jwt.verify(refreshToken, 'refreshtokensecret', function(err,decode) {
        if(err) {
            res.status(400).json({
                err
            })
        }
        else {
            let token = jwt.sign({name: decode.nombre}, 'AzQ,PI)0(', {expiresIn:'1h'})
            let refreshToken = req.body.refreshToken
            res.status(200).json({
                massage: "Token refreshed successfully"
            })
        }
    })
}

module.exports = {
    register, 
    login,
    refreshToken
}
