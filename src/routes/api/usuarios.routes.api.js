const express = require('express');
const Uroute = express.Router();

//todo ******* E N C R I P T A D O ***************

const bcrypt = require('bcryptjs')

//todo *** VALIDACION DE INFORMACION ENTRADA  ****

const {check, validationResult} = require('express-validator');

//* check comprueba los diferentes datos que se estan ingresando en la ruta trabajada "como un middleware"


//TODO *******************************************

const User = require('../../db')

Uroute.get('/', async (req,res)=>{

    res.json("hola desde el get de usuarios.js leido desde api.js")
    
    // mostramos todas las peliculas guardadas en la base de datos
    
    console.log(("se han obtenido las peliculas").blue);
    const usuarios = await User.findAll()
    //res.json(usuarios)
    console.log(usuarios);

})

Uroute.post('/', [

    //! checamos que la informacion se suministre

    check('name', 'nombre obligatorio').not().isEmpty(),
    check('lastname', 'apellido obligatorio').not().isEmpty(),
    check('email', 'correo obligatorio').not().isEmpty(),
    check('password', 'contraseña obligatoria').not().isEmpty()

  ],async (req,res) => {

    //! validationResult capturamos los errores

    const errors = validationResult(req) 
    
    if(!errors.isEmpty()) 
    {
        return res.status(422).json({errores: errors.array() }) //! con .array convierto en array los errores
        //todo si hay un error o errores, manda un array con todos los errores en las entradas
    }



    req.body.password = bcrypt.hashSync(req.body.password,10)
    const usuario = await User.create(req.body); // llamamos del body la informacion
    res.json('se ha creado un nuevo usuario')
    //res.json(usuario)
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