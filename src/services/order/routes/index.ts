import {Request, Response, NextFunction} from "express";
import {OrderController} from "../controllers/orderController";

export class orderRoutes{

    public path: String = '/order';
    public orderController: OrderController = new OrderController();
    public routes(app): void {
        app.route(`${this.path}`)
            .get(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.orderController.index.bind(this.orderController))

            .post(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.orderController.save.bind(this.orderController))

            .delete(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.orderController.delete.bind(this.orderController));
    }
}