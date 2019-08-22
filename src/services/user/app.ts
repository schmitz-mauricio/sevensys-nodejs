import AppClass from "../../app.class";
import {userRoutes} from "./routes";

const routes = new userRoutes();

class App extends AppClass {

    constructor(routes){
        super(routes);

        this.config();
    }
}

export default new App(routes).app;