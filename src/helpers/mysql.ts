const mysqlDefaults = require('../config/mysql').mysqlDefaults;
const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : mysqlDefaults.options.host,
  port     : mysqlDefaults.options.port,
  user     : mysqlDefaults.user,
  password : mysqlDefaults.password,
  database : mysqlDefaults.database
});

function openConnection() {
    return new Promise((resolve, reject) => {
        // connection.connect(function(err){
        //     if(err) reject(err);
        //     console.log('conectou!');
        //     resolve(connection);
        // });
        resolve(connection);
    });
}

module.exports = {
    openConnection,
};