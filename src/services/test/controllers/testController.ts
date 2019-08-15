import { Request, Response } from 'express';
import {Test} from '../models/Test';
import { testRoutes } from '../routes';

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
            const test = await Test.findByPk(req.params.id);
            if(test == null){
                return res.status(404).json({message: "Test não encontrado!"});    
            }
            return res.status(200).json(test);
        } catch(e) {
            return res.status(400).json({message: e.message});
        } 
    }
    public async save(req:Request, res: Response){
        try {
            const test = await Test.create(req.body);
            return res.status(201).json(test);
        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }
    public async edit(req:Request, res: Response){
        try {
            const test = await Test.findByPk(req.params.id);
            if(test == null){
                return res.status(404).json({message: "Test não encontrado!"});    
            }
            const result = await test.update(req.body);
            return res.status(200).json(result);
        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }
    public async delete(req:Request, res: Response){
        try {
            const test = await Test.findByPk(req.params.id);
            if(test == null){
                return res.status(404).json({message: "Test não encontrado!"});    
            }
            const result = await Test.destroy({
                where: {
                    id: test.id
                }
            });
            return res.status(200).json({ message: result == 1 ? "Registro removido com sucesso" : "Ops... Ocorreu um erro!"});
        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }
}