import {Request, Response, NextFunction} from "express";
import {TestController} from "../controllers/testController";

export class testRoutes{

    public path: String = '/test';
    public testController: TestController = new TestController();
    public routes(app): void {
        
        app.route(`${this.path}/:id`)
            .get(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.testController.show.bind(this.testController))
            
            .put(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.testController.edit.bind(this.testController))
            
            .delete(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.testController.delete.bind(this.testController));

        app.route(this.path)
            .get(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.testController.index.bind(this.testController))

            .post(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.testController.save.bind(this.testController));


    }
}