const {config} = require('dotenv');
config();

exports.module = {

    PORT : process.env.PORT,
    DBNAME : process.env.DBNAME,
    USER_DB : process.env.USER_DB,
    PASSWORD_DB : process.env.PASSWORD_DB,
    DB_HOST : process.env.DB_HOST
}