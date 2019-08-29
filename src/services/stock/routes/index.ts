import {Request, Response, NextFunction} from "express";
import {StockController} from "../controllers/stockController";

export class stockRoutes{

    public path: String = '/stock';
    public stockController: StockController = new StockController();
    public routes(app): void {
        
        app.route(`${this.path}`)
            .get(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.stockController.index.bind(this.stockController));

        app.route(`${this.path}/in`)
            .post(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.stockController.stockIn.bind(this.stockController));

        app.route(`${this.path}/out`)
            .post(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.stockController.stockOut.bind(this.stockController));
        app.route(`${this.path}/delete`)
            .post(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.stockController.deleteAll.bind(this.stockController));
    }
}