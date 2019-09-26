import {Request, Response, NextFunction} from "express";
import {ReportController} from "../controllers/reportController";

export class reportRoutes{

    public path: String = '/report';
    public reportController: ReportController = new ReportController();
    public routes(app): void {

            
    }
}