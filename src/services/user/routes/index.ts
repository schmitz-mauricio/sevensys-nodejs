import {Request, Response, NextFunction} from "express";
import {UserController} from "../controllers/userController";

export class testRoutes{

    public path: String = '/user';
    public userController: UserController = new UserController();
    public routes(app): void {
        app.route(`${this.path}/:id`)
            .get(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.userController.show.bind(this.userController))
            
            .put(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.userController.edit.bind(this.userController))
            
            .delete(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.userController.delete.bind(this.userController));

        app.route(this.path)
            .get(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.userController.index.bind(this.userController))

            .post(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.userController.save.bind(this.userController));

        app.route(`${this.path}/login`)
            .post(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.userController.login.bind(this.userController));





    }
}