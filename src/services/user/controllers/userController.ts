import { Request, Response } from 'express';
import {User} from '../models/User';
import { userRoutes } from '../routes';
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export class UserController{

    public async login(req: Request, res: Response){
        try {
            const user = await User.findOne({
                where: {
                    login: req.body.login
                }
            });
            if( user == null ) {
                return res.status(403).json({message: "Usuário não encontrado"});
            }
            const result = await bcrypt.compare(req.body.password, user.password);
            if(!result) {
                return res.status(403).json({message: "Usuário ou senha inválidos"});
            }
            var token = jwt.sign({id: user.id}, process.env.SECRET || 'qualquercoisa', {
                expiresIn: 300 // expires in 5min
            });

            return res.status(200).json({ auth: true, token });

        } catch(e){
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async index(req:Request, res: Response){
        try {
            const list = await User.findAndCountAll();
            
            return res.json(list);

        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }
    public async show(req:Request, res: Response){
        try {
            const user = await User.findByPk(req.params.id);
            if(user == null){
                return res.status(404).json({message: "User não encontrado!"});    
            }
            return res.status(200).json(user);
        } catch(e) {
            return res.status(400).json({message: e.message});
        } 
    }
    public async save(req:Request, res: Response){
        try {
            req.body.password = await bcrypt.hash(req.body.password, 6);
            const user = await User.create(req.body);
            return res.status(201).json(user);
        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }
    public async edit(req:Request, res: Response){
        try {
            const user = await User.findByPk(req.params.id);
            if(user == null){
                return res.status(404).json({message: "User não encontrado!"});    
            }
            const result = await user.update(req.body);
            return res.status(200).json(result);
        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }
    public async delete(req:Request, res: Response){
        try {
            const user = await User.findByPk(req.params.id);
            if(user == null){
                return res.status(404).json({message: "User não encontrado!"});    
            }
            const result = await User.destroy({
                where: {
                    id: user.id
                }
            });
            return res.status(200).json({ message: result == 1 ? "Registro removido com sucesso" : "Ops... Ocorreu um erro!"});
        } catch(e) {
            return res.status(400).json({message: e.message});
        }
    }
}