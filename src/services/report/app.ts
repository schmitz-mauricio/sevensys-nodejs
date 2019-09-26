import AppClass from "../../app.class";
import {reportRoutes} from "./routes";

const mongodb = require('../../helpers/mongodb');
const mysql = require('../../helpers/mysql');
import {ReportJobs} from "./jobs/reportJob";

const routes = new reportRoutes();

class App extends AppClass {

    constructor(routes){
        super(routes);

        this.loadJobs();
        this.config();
    }

    private loadJobs(){
        const orderJobs = new ReportJobs();
        orderJobs.startJobs();
    }
}

export default new App(routes).app;