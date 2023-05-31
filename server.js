const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Usuario = require('./models/Usuario')
const Evento = require('./models/Evento') 
const UserN = require('./models/UserN')

const UsuarioRoute = require('./routes/usuario')
const EventoRoute = require('./routes/evento')
const AuthRoute = require('./routes/auth')
const UserNRoute = require('./routes/userN')

mongoose.connect('mongodb://127.0.0.1:27017/usuarioPI', {useNewURLParser: true, useUnifiedTopology: true})

const objetodb = mongoose.connection

objetodb.on('error', ()=>  {    
    console.log('Error en la conexion a MongoDB')
})

objetodb.once('open', ()=>{
    console.log('Conexion correcta a MongoDB')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:'true'}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

app.use('/api/usuario', UsuarioRoute)
app.use('/api/evento', EventoRoute)
app.use('/api', AuthRoute)
app.use('/api/userN', UserNRoute)

