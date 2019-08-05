import {Request, Response, NextFunction} from "express";
import {Test} from '../models/Test';
export class testRoutes{

    public path: String = '/test';

    public routes(app): void {
        app.route(this.path)
            .post(async(req: Request, res: Response, next: NextFunction) => {
                const test = await Test.create(req.body);
                res.json(test);
            });
    }
}