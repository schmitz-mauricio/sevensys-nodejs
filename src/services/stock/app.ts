import AppClass from "../../app.class";
import {stockRoutes} from "./routes";
import * as mongoose from "mongoose";
import {configMongo} from '../../config/mongodb';

import {StockJobs} from "./jobs/stockJob";

const routes = new stockRoutes();

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