import * as _ from "lodash";
const mysql = require('../../../helpers/mysql');

export class Customer{

    public async save(data){
        return new Promise(async (resolve, reject) =>{
            const conn = await mysql.openConnection();
            const exist:any = await this.find(conn, data);
            if(exist.length > 0) {
                resolve(await this.update(conn, data, exist[0].id));
            } else {
                resolve(await this.add(conn, data));
            }
        });
    }

    public async add(conn, data){
        return new Promise((resolve, reject) =>{
            const sql = "INSERT INTO Customers(name,email,phone,birthday,cpf) VALUES ?";
            const values = [
                [data.name, data.email, data.phone_numbers, data.birthday, _.filter(data.documents, { 'type': "cpf" })[0].number]
                ];
            conn.query(sql, [values], function (error, results, fields){
                if(error) reject(error);
                resolve(results.insertId);
            });
        });
    }

    public async update(conn, data, id){
        return new Promise((resolve, reject) =>{
            const sql = "UPDATE Customers SET name = ? , email = ?, phone = ?, birthday = ? WHERE id = ?";
            conn.query(sql, [data.name, data.email, data.phone_numbers, data.birthday, id], function (error, results, fields){
                if(error) reject(error);
                resolve(id);
            });
        });
    }

    public async find(conn, data){
        return new Promise((resolve, reject) =>{
            const sql = "SELECT id FROM Customers WHERE cpf = ?";
            conn.query(sql, [_.filter(data.documents, { 'type': "cpf" })[0].number], function (error, results, fields){
                if(error) reject(error);
                resolve(results);
            });
        });
        
    }
}