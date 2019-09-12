import * as _ from "lodash";
const mysql = require('../../../helpers/mysql');

export class Customer{

    public async save(data) {
        return new Promise(async(resolve, reject) => {
            const exist:any = await this.find(data);
            if(exist.length > 0) {
                resolve(await this.update(data, exist[0].id));
            }else{
                resolve(await this.add(data));
            }
        });
    }

    public async find(data) {
        return new Promise(async(resolve, reject) => {
            const conn = await mysql.openConnection();
            const sql = `SELECT id FROM Customers WHERE cpf = ?`;
            conn.query(sql, [_.filter(data.documents, { 'type': "cpf" })[0].number], function (error, results, fields){
                conn.end();
                if(error) reject(error);
                resolve(results);
            });
        });
    }

    public async add(data){
        return new Promise(async(resolve, reject) => {
            const conn = await mysql.openConnection();
            const sql = `INSERT INTO Customers (name, email, phone, birthday,cpf) VALUES ?`;
            const values = [
                [data.name, data.email, data.phone_numbers, data.birthday, _.filter(data.documents, { 'type': "cpf" })[0].number]
                ];
            conn.query(sql, [values], function (error, results, fields){
                conn.end();
                if(error) reject(error);
                resolve(results.insertId);
            });
        });
    }

    public async update(data, id){
        return new Promise(async (resolve, reject) =>{
            const conn = await mysql.openConnection();
            const sql = "UPDATE Customers SET name = ? , email = ?, phone = ?, birthday = ? WHERE id = ?";
            conn.query(sql, [data.name, data.email, data.phone_numbers, data.birthday, id], function (error, results, fields){
                conn.end();
                if(error) reject(error);
                resolve(id);
            });
        });
    }
}