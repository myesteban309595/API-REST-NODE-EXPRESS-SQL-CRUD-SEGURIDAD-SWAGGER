const express = require('express');
const Uroute = express.Router();

const User = require('../../db')

Uroute.get('/', async (req,res)=>{

    res.json("hola desde el get de usuarios.js leido desde api.js")
    
    // mostramos todas las peliculas guardadas en la base de datos
    
    console.log(("se han obtenido las peliculas").blue);
    const usuarios = await User.findAll()
    //res.json(usuarios)
    console.log(usuarios);

})

Uroute.post('/', async (req,res) => {

    const usuario = await User.create(req.body); // llamamos del body la informacion
    res.json('se ha creado un nuevo usuario')
    console.log(('se ha agregado un usuario ').green);
});

Uroute.put('/:idUser', async (req,res) => {

    await User.update(req.body, {
        where: {id : req.params.idUser}
    })

    console.log((`se ha actualizado el usuario`).green);
    res.json('se ha actualizado el usuario')
});

Uroute.delete('/:User', async (req,res) => {

    await User.destroy({
        where: {id : req.params.User}
    })

    console.log((`se ha eliminado el usuario`).red);
    res.json('se ha eliminado el usuario')
});

module.exports = Uroute;