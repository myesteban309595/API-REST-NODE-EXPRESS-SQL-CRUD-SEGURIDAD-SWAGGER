const express = require('express');
const Proute = express.Router();

const PELI = require('../../db')

Proute.get('/', async (req,res)=>{

    res.json("hola desde el get de peliculas.js leido desde api.js")
    
    // mostramos todas las peliculas guardadas en la base de datos
    
    console.log(("se han obtenido las peliculas").blue);
    const peliculas = await PELI.findAll()
    //res.json(peliculas)
    console.log(peliculas);

})

Proute.post('/', async (req,res) => {

    const pelicula = await PELI.create(req.body); // llamamos del body la informacion
    res.json('se ha creado una nueva pelicula')
    console.log(('se ha agregado una pelicula ').green);
});

Proute.put('/:idPeli', async (req,res) => {

    await PELI.update(req.body, {
        where: {id : req.params.idPeli}
    })

    console.log((`se ha actualizado la pelicula`).green);
    res.json('se ha actualizado la pelicula')
});

Proute.delete('/:idPeli', async (req,res) => {

    await PELI.destroy({
        where: {id : req.params.idPeli}
    })

    console.log((`se ha eliminado la pelicula`).red);
    res.json('se ha eliminado la pelicula')
});

module.exports = Proute;