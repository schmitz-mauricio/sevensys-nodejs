import * as express from "express";

class AppClass {
    public app: express.Application;
    public routes;
    
    constructor(routes){
        this.routes = routes;

        this.app = express();
    }

    public config(){
        
    }
}

export default AppClass;