import {Request, Response, NextFunction} from "express";
export class testRoutes{

    public path: String = '/test';

    public routes(app): void {
        app.route(this.path)
            .get((req: Request, res: Response, next: NextFunction) => {
                res.send({});
                res.end()
            });
    }
}