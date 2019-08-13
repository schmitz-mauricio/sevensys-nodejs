import * as express from "express";
import * as RateLimit from "express-rate-limit";
import * as bodyParser from "body-parser";
import {Request, Response, NextFunction} from "express";

const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

class AppClass {
    public app: express.Application;
    public routes;
    
    constructor(routes){
        this.routes = routes;

        this.app = express();
    }

    public config(){
        const apiLimiter = new RateLimit({
            windowMs: 1 * 60 * 1000,
            max: 20000,
            delayMs: 0,
            message: 'Limite de request para o IP, Por favor tente novamente após 1 minuto'
        });
        this.app.use(`${this.routes.path}/`, apiLimiter);

        this.app.use(bodyParser.json({ limit: '1000mb', type: 'application/json' }));
        this.app.use(bodyParser.raw({ limit: '1000mb', type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // gzip comprjson2xlsession
        this.app.use(compress());

        // secure apps by setting various HTTP headers
        this.app.use(helmet());

        this.app.route(`${this.routes.path}/teste`)
            .get((req: Request, res: Response, next: NextFunction) => {
                res.json({message: 'Chegou'});
            });
        
        // enable CORS - Cross Origin Resource Sharing
        this.app.use(cors());
        // Apidoc
        this.app.use(`${this.routes.path}/apidoc`, express.static('dist/apidoc'));
        this.app.use(`${this.routes.path}/`, express.static('public'));

        // Load Routes
        this.routes.routes(this.app);   
        // Add error formating 
        this.app.use(function(err, req, res, next){
            res.status(400).json(err);
        });
    }
}

export default AppClass;