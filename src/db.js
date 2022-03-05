// usaremos remote mysql 

const Sequelize = require('sequelize')
const config = require('./config')

require('dotenv').config();

const peliculaModel = require('./models/peliculas.models');
const usuariosModel = require('./models/users.models')

const USER_DB = config.module.USER_DB // root
const PASSWORD_DB = config.module.PASSWORD_DB; // root
const DB_HOST = config.module.DB_HOST; // localhost

// console.log(USER_DB);
// console.log(PASSWORD_DB);

const sequelize = new Sequelize('basedatosprueba', USER_DB , PASSWORD_DB, {   //! aqui debo llenar estos datos para conectar a la base de datos, si no amrca error

    host: DB_HOST,  //! server
    dialect: 'mysql' //? toca instalar mysql2
    
})

const PELI = peliculaModel(sequelize, Sequelize)
const User = usuariosModel(sequelize, Sequelize)

sequelize.sync({force : false})
.then(()=> {
    
    console.log(("conectada a la base de datos heidi sql ").bgBlue);
    console.log(("tablas sincronzadas ").bgGreen.black);
})


module.exports = PELI;  
module.exports = User;  