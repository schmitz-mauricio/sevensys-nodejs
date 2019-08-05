import { Request, Response } from 'express';
import {Test} from '../models/Test';

//const func = require('../../../helpers/functions');
//const logger = require('../../../helpers/logger');

export class TestController{
    
    public async index(req: Request, res: Response){
        try {
            const result = await Test.findAndCountAll();
            //const test = await Test.create(req.body);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!"});
        }
    }

    public async show(req: Request, res: Response){
        try {
            const test = await Test.findByPk(req.params.id);
            if(test == null){
                return res.status(404).json({message: "Test não encontrado!"});    
            }
            return res.status(200).json(test);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!"});
        }
    }

    public async save(req: Request, res: Response){
        try {
            const test = await Test.create(req.body);
            return res.status(201).json(test);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!"});
        }
    }

    public async edit(req: Request, res: Response){
        try {
            const test = await Test.findByPk(req.params.id);
            if(test == null){
                return res.status(404).json({message: "Test não encontrado!"});    
            }
            const result = await test.update(req.body);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!"});
        }
    }

    public async delete(req: Request, res: Response){
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
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!"});
        }
    }
}