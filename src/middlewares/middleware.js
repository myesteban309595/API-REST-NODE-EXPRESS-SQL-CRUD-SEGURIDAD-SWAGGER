
const jwt = require('jwt-simple')

const checkToken = (req,res,next) => {  //^ para obligar a todo aquelq ue entre a mi app a pasar el token atraves de las cabeceras

 //& compruebo si el token me loe stan incorporando dentro las cabeceras

 if(!req.headers['user-token']) //^nombre de la cabcera por donde voy a pedir el token
 {
    return res.json({error: 'necesitas incluir el user-token en la cabecera'})
 }

 const userToken = req.headers['user-token'];
 let payload = {}; //^ intente desencriptarlo

 try{
 
    payload = jwt.decode(userToken, 'super password') //& contraseña secreta con la cual quiero decifrarlo
 
    } catch (err) {

     return res.json({error: 'el token es incorrecto'})
 }

 if(payload.expiredAt < moment().unix())
 {
     return res.json({error : 'el token ha expirado'})
 }

 req.usuarioId = payload.usuarioId;
    next();
}