import { Request, Response } from 'express';
import {Category} from '../models/Category';

export class CategoryController{
    
    public async index(req: Request, res: Response){
        try {
            const result = await Category.findAndCountAll();
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async show(req: Request, res: Response){
        try {
            const category = await Category.findByPk(req.params.id);
            if(category == null){
                return res.status(404).json({message: "Categoria não encontrado!"});    
            }
            return res.status(200).json(category);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async save(req: Request, res: Response){
        try {
            const category = await Category.create(req.body);
            return res.status(201).json(category);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async edit(req: Request, res: Response){
        try {
            const category = await Category.findByPk(req.params.id);
            if(category == null){
                return res.status(404).json({message: "Categoria não encontrado!"});    
            }
            const result = await category.update(req.body);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async delete(req: Request, res: Response){
        try {
            const category = await Category.findByPk(req.params.id);
            if(category == null){
                return res.status(404).json({message: "Categoria não encontrado!"});    
            }
            const result = await Category.destroy({
                where: {
                    id: category.id
                }
            });
            return res.status(200).json({ message: result == 1 ? "Registro removido com sucesso" : "Ops... Ocorreu um erro!"});
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }
}