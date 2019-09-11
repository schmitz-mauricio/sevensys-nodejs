import {Request, Response, NextFunction} from "express";
import {StockController} from "../controllers/stockController";

export class testRoutes{

    public path: String = '/stock';
    public stockController: StockController = new StockController();
    public routes(app): void {
        app.route(`${this.path}`)
            /**
             * @api {get} /stock Retorna uma lista de estoques 
             * @apiDescription Retorna uma lista de estoques 
             * @apiVersion 1.0.0
             * @apiName Retorna uma lista de estoques 
             * @apiGroup Stock
             * @apiHeader {String} x-access-token  Token gerado no login
             * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
             * @apiError (Bad Request 400) BadRequest Erro interno.
             * @apiSuccessExample {json} Success-Response:
             * [
             *      {
             *          "status": "PROCESSED",
             *          "_id": "5d671a9243416c034abb9853",
             *          "product": 1,
             *          "quantity": 10,
             *          "type": "IN",
             *          "created_date": "2019-08-29T00:21:38.727Z",
             *          "__v": 0
             *      }
             *  ]
             */
            .get(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.stockController.index.bind(this.stockController));

        app.route(`${this.path}/in`)
            /**
             * @api {post} /stock/in Adicionar estoque
             * @apiDescription Adicionar estoque
             * @apiVersion 1.0.0
             * @apiName Adicionar estoque
             * @apiGroup Stock
             * @apiHeader {String} x-access-token  Token gerado no login
             * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
             * @apiError (Bad Request 400) BadRequest Erro interno.
             * @apiParam {Number} product Código do produto
             * @apiParam {Number} quantity Quantidade
             * @apiParamExample {json} Request-Example:
             * {
             *    "product": 1,
             *    "quantity": 4
             * }
             * @apiSuccessExample {json} Success-Response:
             * {
             *      "status": "PENDING",
             *      "_id": "5d6fdb21a50e464c97248b29",
             *      "product": 1,
             *      "quantity": 10,
             *      "type": "IN",
             *      "created_date": "2019-09-04T15:41:21.417Z",
             *      "__v": 0
             * }
             */
            .post(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.stockController.stockIn.bind(this.stockController));

        app.route(`${this.path}/out`)
            /**
             * @api {post} /stock/out Baixar estoque
             * @apiDescription Baixar estoque
             * @apiVersion 1.0.0
             * @apiName Baixar estoque
             * @apiGroup Stock
             * @apiHeader {String} x-access-token  Token gerado no login
             * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
             * @apiError (Bad Request 400) BadRequest Erro interno.
             * @apiParam {Number} product Código do produto
             * @apiParam {Number} quantity Quantidade
             * @apiParamExample {json} Request-Example:
             * {
             *    "product": 1,
             *    "quantity": 4
             * }
             * @apiSuccessExample {json} Success-Response:
             * {
             *      "status": "PENDING",
             *      "_id": "5d6fdb21a50e464c97248b29",
             *      "product": 1,
             *      "quantity": 10,
             *      "type": "OUT",
             *      "created_date": "2019-09-04T15:41:21.417Z",
             *      "__v": 0
             * }
             */
            .post(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.stockController.stockOut.bind(this.stockController));

        app.route(`${this.path}/delete`)
            /**
             * @api {delete} /stock/delete Limpar fila
             * @apiDescription Limpar filaBaixar estoque
             * @apiVersion 1.0.0
             * @apiName Limpar fila
             * @apiGroup Stock
             * @apiHeader {String} x-access-token  Token gerado no login
             * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
             * @apiError (Bad Request 400) BadRequest Erro interno.
             * @apiSuccessExample {json} Success-Response:
             * {
             *  "err": null,
             *  "response": {
             *      "n": 1,
             *      "opTime": {
             *          "ts": "6730360971426004993",
             *          "t": 4
             *      },
             *      "electionId": "7fffffff0000000000000004",
             *      "ok": 1,
             *      "operationTime": "6730360971426004993",
             *      "$clusterTime": {
             *          "clusterTime": "6730360971426004993",
             *          "signature": {
             *              "hash": "apj2eJbM5pikDQMdkROg5YhFGAg=",
             *              "keyId": "6713400493466451969"
             *          }
             *      },
             *      "deletedCount": 1
             *  }
             */
            .post(async(req: Request, res: Response, next: NextFunction) => {
                next();  
            }, this.stockController.deleteAll.bind(this.stockController));
    }
}