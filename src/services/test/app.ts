import AppClass from "../../app.class";
import {testRoutes} from "./routes";

const routes = new testRoutes();

class App extends AppClass {

    constructor(routes){
        super(routes);

        this.config();
    }
}

export default new App(routes).app;