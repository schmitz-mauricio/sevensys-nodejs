import { Request, Response } from 'express';
import * as _ from "lodash";
import {Customer} from "../structure/customer";
import {Pagarme} from "../structure/pagarme";

const mongodb = require('../../../helpers/mongodb');

export class OrderController{
    public customer:Customer = new Customer();
    public pagarme:Pagarme = new Pagarme();

    public async index(req: Request, res: Response){
        try {
            const list = await mongodb.find('order', req.query);
            return res.json(list);

        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async save(req: Request, res: Response){
        try {
            req.body.status = 'PENDING';
            const save = await mongodb.save('order', req.body);
            return res.json(save);

        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async delete(req: Request, res: Response){
        try {
            const resDelete = await mongodb.deleteMany('order', {});
            return res.json(resDelete);

        } catch (e) {
            return res.status(400).json({message: "Ops... Ocorreu um erro!", error: e.message});
        }
    }

    public async processJob(){
        try {
            const orders = await mongodb.find('order', {status: "PENDING"});
            // Atualiza para status Processando
            if(orders.length > 0) {
                // Update for PROCESSING
                const resUpdate = await mongodb.updateManySet('order', {
                    _id: {$in: _.map(orders, '_id')}
                },{
                    $set: {status: "PROCESSING"}
                });

                if(resUpdate.modifiedCount < orders.length){
                    throw new Error("Não foi possivel processar os registros");
                }

                for(let order of orders){
                    //Salva cliente na tabela
                    const customerId = await this.customer.save(order.customer).toString();
                    order.customer.external_id = customerId;
                    // Atuliza o customer ID no objeto mongo
                    const resUpdateCustomerId = await mongodb.updateManySet('order', {
                        _id: order._id
                    },{
                        $set: {"customer.external_id": customerId}
                    });
                    //Gerar Transação
                    const pagarme = await  this.pagarme.transaction(order);

                    const resUpdate = await mongodb.updateManySet('order', {
                        _id: order._id
                    },{
                        $set: {status: "PROCESSED", pagarme}
                    });
                }
            }
            return true;
        } catch (e) {
            return false;
        }
    }
}