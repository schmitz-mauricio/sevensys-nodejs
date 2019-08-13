import { Request, Response } from 'express';
import {Test} from '../models/Test';

export class TestController{
    public async index(req:Request, res: Response){
        try {
            const list = await Test.findAndCountAll();
            
            return res.json(list);

        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }
    public async show(req:Request, res: Response){
        try {

        } catch(e) {
            return res.status(400).json({message: e.message});
        } 
    }
    public async save(req:Request, res: Response){
        try {

        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }
    public async edit(req:Request, res: Response){
        try {

        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }
    public async delete(req:Request, res: Response){
        try {

        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }
}