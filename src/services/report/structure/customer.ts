import * as _ from "lodash";
const mysql = require('../../../helpers/mysql');

export class Customer{

    public async find(page) {
        return new Promise(async(resolve, reject) => {
            const conn = await mysql.openConnection();
            const sql = `SELECT * FROM Customers LIMIT 1 OFFSET ${page*1}`;
            conn.query(sql, [], function (error, results, fields){
                conn.end();
                if(error) reject(error);
                resolve(results);
            });
        });
    }

}