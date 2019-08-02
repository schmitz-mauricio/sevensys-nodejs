import * as express from "express";
import {Request, Response, NextFunction} from "express";
import * as RateLimit from "express-rate-limit";
import * as bodyParser from "body-parser";
import * as cors from "cors";

class AppClass {
    public app: express.Application;
    public routes;
    
    constructor(routes){
        this.routes = routes;

        this.app = express();
    }

    public config(){
        this.app.enable('trust proxy');
        const apiLimiter = new RateLimit({
            windowMs: 1 * 60 * 1000, // 1 minutes
            max: 20000,
            delayMs: 0,
            message: 'Limite de requests para o IP, por favor tente novamente após 1 minuto',
        });
        this.app.use(`${this.routes.path}/`, apiLimiter);

        this.app.use(bodyParser.json({ limit: '1000mb', type: 'application/json' }));
        this.app.use(bodyParser.raw({ limit: '1000mb', type: 'application/json' }));
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // enable CORS - Cross Origin Resource Sharing
        //this.app.use(cors());

        this.app.route(`${this.routes.path}/teste`)
            .get((req: Request, res: Response, next: NextFunction) => {
                res.json({message: 'Chegou'});
            });

        // Load Routes
        this.routes.routes(this.app);  

        // Add error formating 
        this.app.use(function(err, req, res, next){
            res.status(400).json(err);
        });
    }
}

export default AppClass;