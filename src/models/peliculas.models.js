
// va a la base de datos y automaticamente me genera la tabla en la base de datos

module.exports = (sequelize, type) => {
    return sequelize.define('pelicula', // nombretablasingular, objeto
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: type.STRING,
        descripcion: type.STRING,
        score: type.STRING,
        director: type.STRING

    })
}