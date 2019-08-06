import { Request, Response } from 'express';
import {Product} from '../models/Product';

export class ProductController{
    
    public async index(req: Request, res: Response){
        try {
            const result = await Product.findAndCountAll();
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async show(req: Request, res: Response){
        try {
            const product = await Product.findByPk(req.params.id);
            if(product == null){
                return res.status(404).json({message: "Produto não encontrado!"});    
            }
            return res.status(200).json(product);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async save(req: Request, res: Response){
        try {
            const product = await Product.create(req.body);
            return res.status(201).json(product);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async edit(req: Request, res: Response){
        try {
            const product = await Product.findByPk(req.params.id);
            if(product == null){
                return res.status(404).json({message: "Produto não encontrado!"});    
            }
            const result = await product.update(req.body);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async delete(req: Request, res: Response){
        try {
            const product = await Product.findByPk(req.params.id);
            if(product == null){
                return res.status(404).json({message: "Produto não encontrado!"});    
            }
            const result = await Product.destroy({
                where: {
                    id: product.id
                }
            });
            return res.status(200).json({ message: result == 1 ? "Registro removido com sucesso" : "Ops... Ocorreu um erro!"});
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }
}