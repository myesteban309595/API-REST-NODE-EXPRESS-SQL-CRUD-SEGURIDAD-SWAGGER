
// aqui voy a recibir todas las rutas de la carpeta api

const express = require('express');
const route = express.Router();

const peliculasApi = require('./api/peliculas.routes.api');
const usuariosApi = require('./api/usuarios.routes.api');
const middleware = require('../middlewares/middleware')


route.use('/peliculas',middleware.checkToken, peliculasApi); //todo la ruta seria /api/peliculas   la lee el index del api.js y el apijs lee del peliculas.js
route.use('/usuarios',middleware.checkToken, usuariosApi);

module.exports = route;