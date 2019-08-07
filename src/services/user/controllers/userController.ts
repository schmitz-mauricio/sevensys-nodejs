import { Request, Response } from 'express';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

import {User} from '../models/User';


export class UserController{
    
    public async login(req: Request, res: Response){
        try {
            const user = await User.findOne({
                where: {
                    login: req.body.login
                }
            });
            if(user == null) {
                return res.status(403).json({message: "Usuário não encontrado!"});    
            }
            const result = await bcrypt.compare(req.body.password, user.password);
            if(!result){
                return res.status(403).json({message: "Usuário ou senha inválidos!"});    
            }
            var token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 300 // expires in 5min
            });
            return res.status(200).send({ auth: true, token: token });
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async index(req: Request, res: Response){
        try {
            const result = await User.findAndCountAll();
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async show(req: Request, res: Response){
        try {
            const user = await User.findByPk(req.params.id);
            if(user == null){
                return res.status(404).json({message: "Usuário não encontrado!"});    
            }
            return res.status(200).json(user);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async save(req: Request, res: Response){
        try {
            req.body.password = await bcrypt.hash(req.body.password, 6);
            const user = await User.create(req.body);
            return res.status(201).json(user);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async edit(req: Request, res: Response){
        try {
            const user = await User.findByPk(req.params.id);
            if(user == null){
                return res.status(404).json({message: "usuário não encontrado!"});    
            }
            req.body.password = await bcrypt.hash(req.body.password, 6);
            const result = await user.update(req.body);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async delete(req: Request, res: Response){
        try {
            const user = await User.findByPk(req.params.id);
            if(user == null){
                return res.status(404).json({message: "Usuário não encontrado!"});    
            }
            const result = await User.destroy({
                where: {
                    id: user.id
                }
            });
            return res.status(200).json({ message: result == 1 ? "Registro removido com sucesso" : "Ops... Ocorreu um erro!"});
        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }
}