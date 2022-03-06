const express = require('express');
const Uroute = express.Router();

//& ============   E N C R I P T A D O  ===============
     const bcrypt = require('bcryptjs')
//& ======== VALIDACION DE INFORMACION ENTRADA  =======

//^ check comprueba los diferentes datos que se estan ingresando en la ruta trabajada "como un middleware"
     const {check, validationResult} = require('express-validator');

//& =================   J W T    =====================================
     const moment = require('moment');  //^ para manejo de fechas
     const jwt = require('jwt-simple'); 
//& ==================================================================

const User = require('../../db')

Uroute.get('/', async (req,res)=>{

    res.json("hola desde el get de usuarios.js leido desde api.js")
    
    //^ mostramos todas las peliculas guardadas en la base de datos
    
    console.log(("se han obtenido las peliculas").blue);
    const usuarios = await User.findAll()
    //res.json(usuarios)
    console.log(usuarios);

})

Uroute.post('/', [

    //^ checamos que la informacion se suministre

    check('name', 'nombre obligatorio').not().isEmpty(),
    check('lastname', 'apellido obligatorio').not().isEmpty(),
    check('email', 'correo obligatorio').not().isEmpty(),
    check('password', 'contraseña obligatoria').not().isEmpty()

  ],async (req,res) => {

    //^ validationResult capturamos los errores

    const errors = validationResult(req) 
    
    if(!errors.isEmpty()) 
    {
        return res.status(422).json({errores: errors.array() }) //! con .array convierto en array los errores
        //& si hay un error o errores, manda un array con todos los errores en las entradas
    }

    req.body.password = bcrypt.hashSync(req.body.password,3)
    const usuario = await User.create(req.body); //^ llamamos del body la informacion
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

//^ ================== ⁡⁢⁣⁣ L O G I N ⁡ ========================

Uroute.post('/login', async (req, res) => {

    const user = await User.findOne({where: {email: req.body.email}})  //& si existe en la base de datos

    if(user)
    {
    //~  𝘤𝘰𝘮𝘱𝘢𝘳𝘢𝘮𝘰𝘴 𝘭𝘢 𝘤𝘰𝘯𝘵𝘳𝘢𝘴𝘦ñ𝘢 𝘦𝘤𝘳𝘪𝘱𝘵𝘢𝘥𝘢 𝘥𝘦 𝘭𝘢 𝘣𝘢𝘴𝘦 𝘥𝘦 𝘥𝘢𝘵𝘰𝘴 𝘤𝘰𝘯 𝘭𝘢 𝘥𝘦𝘭 𝘶𝘴𝘶𝘢𝘳𝘪𝘰 𝘪𝘯𝘨𝘳𝘦𝘴𝘢𝘯𝘥𝘰
    const igualPassword = bcrypt.compareSync(req.body.password, user.password) 

    if(igualPassword)
    {
        res.json({ success: createToken(user)}) 

      }else{
        res.json({error: 'error en usuarios y/o contraseña'});
      }
    }else{
        res.json({error: 'error en usuarios o contraseña'});
    }
})

//^ ==============   ⁡⁢⁣⁣CREACION DEL TOKEN⁡   ==================

const createToken = (user) => {

    const payload = {
        usuarioId: user.id,
        createAt: moment().unix(),  // momento captura la fecha del login y unix cnvierte esa fecha a formato unico
        expiredAt: moment().add(5, 'minutes').unix()  //& expiracion del token 5 minutos
    }

    return jwt.encode(payload, 'super password') //^ retorno el token y genero una clave secreta

}

module.exports = Uroute;
//^ hola a todos comentarios amarillos
