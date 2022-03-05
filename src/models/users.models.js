
module.exports = (sequelize, type) => {

    return sequelize.define('User', {
        
        id:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: type.STRING,
        lastname: type.STRING,
        email: type.STRING,
        password: type.STRING(150)  // se define el tamaño de la password grande para encriptarla

    });
}