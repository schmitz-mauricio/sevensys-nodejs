import AppClass from "../../app.class";
import {testRoutes} from "./routes";
import * as mongoose from "mongoose";
import {configMongo} from '../../config/mongodb';

import {StockJobs} from "./jobs/stockJob";

const routes = new testRoutes();

class App extends AppClass {

    constructor(routes){
        super(routes);

        this.mongoSetup();
        this.loadJobs();
        this.config();
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(configMongo.uri);    
    }

    private loadJobs(){
        const stockJobs = new StockJobs();
        stockJobs.startJobs();
    }
}

export default new App(routes).app;