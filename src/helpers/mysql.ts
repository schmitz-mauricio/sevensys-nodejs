const mysqlDefaults = require('../config/mysql').mysqlDefaults;
const mysql = require('mysql');

function openConnection(){
    return new Promise(async (resolve, reject) =>{
        const connection = await mysql.createConnection({
            host: mysqlDefaults.options.host,
            port: mysqlDefaults.options.port,
            user: mysqlDefaults.user,
            password: mysqlDefaults.password,
            database: mysqlDefaults.database
        });
        resolve(connection);
    })
}
module.exports = {
    openConnection
}