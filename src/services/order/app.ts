import AppClass from "../../app.class";
import {orderRoutes} from "./routes";
import {configMongo} from '../../config/mongodb';

//import {OrderJobs} from "./jobs/orderJob";

const routes = new orderRoutes();

class App extends AppClass {

    constructor(routes){
        super(routes);

        this.mongoSetup();
        this.loadJobs();
        this.config();
    }

    private mongoSetup(): void{
    }

    private loadJobs(){
        // const orderJobs = new OrderJobs();
        // orderJobs.startJobs();
    }
}

export default new App(routes).app;