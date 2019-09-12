import AppClass from "../../app.class";
import {orderRoutes} from "./routes";

const mongodb = require('../../helpers/mongodb');
const mysql = require('../../helpers/mysql');
import {OrderJobs} from "./jobs/orderJob";

const routes = new orderRoutes();

class App extends AppClass {

    constructor(routes){
        super(routes);

        this.mongoSetup();
        this.mysqlSetup();
        this.loadJobs();
        this.config();
    }

    private mongoSetup(): void{
        mongodb.connect();
    }

    private loadJobs(){
        const orderJobs = new OrderJobs();
        orderJobs.startJobs();
    }

    private async mysqlSetup(){
        const sql  = `CREATE TABLE IF NOT EXISTS Customers (
            id int NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            phone varchar(14) NOT NULL,
            birthday date NOT NULL,
            cpf char(11) NOT NULL,
            PRIMARY KEY (id)
        );`;

        const conn = await mysql.openConnection();
        conn.query(sql, (error, results, fields) => {
            if(error) console.log(error);
            console.log(`criou tabela`);
            conn.end();
        })
    }
}

export default new App(routes).app;