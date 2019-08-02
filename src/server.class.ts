import * as express from "express";
import * as dotenv from "dotenv";
import * as http from "http";

dotenv.config();

class Server {

    public app: express.Application;
    public PORT: Number;

    constructor(port: Number, app: express.Application){
        this.app = app;
        this.PORT = port;

        this.start();
    }

    private start(){
        http.createServer(this.app).listen(this.PORT, () => {
            console.log(`Express server listening on port ${this.PORT}`);
        });
    }
}

export default Server;