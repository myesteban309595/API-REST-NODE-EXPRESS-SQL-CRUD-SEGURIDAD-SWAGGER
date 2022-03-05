const express = require('express');
const colors = require('colors');
const config = require('./config')
const bodyParser = require('body-parser'); // enviar objetos asociados a la peticion post

const app = express();

require('./db');

app.use(bodyParser.json()); // lanzar un middleware
app.use(bodyParser.urlencoded({extended: true })); // codificacion de la url 

app.use(express.json());

const PORT = config.module.PORT || 3000

//! *********************  R U T A S ***********************
app.get('/', (req,res) => {
    res.json('hola desde el servidor de express')
    console.log("hola desde el servidor de express");
})

app.use('/api', require('./routes/api'));

//! ********************************************************

app.listen(PORT, ()=>{
    console.log(("escuchando en el localhost:"+PORT+" ").inverse);
});

module.exports = app;