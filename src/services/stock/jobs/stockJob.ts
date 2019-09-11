import * as cron from "cron";
import {StockController} from "../controllers/stockController";

export class StockJobs{ 
    public stockController:StockController = new StockController();

    public async startJobs(){
        const jobProcessStockIn = new cron.CronJob({
            cronTime: '*/30 * * * * *', // A cada 30s 
            onTick: async () => {
                try{
                    const resultJob = await this.stockController.processJob('IN');
                    console.log(resultJob);
                }catch(e){
                    console.log(e.message);
                }
            },
            start: true,
            timeZone: 'America/Sao_Paulo',
        });

        const jobProcessStockOut = new cron.CronJob({
            cronTime: '*/30 * * * * *', // A cada 30s 
            onTick: async () => {
                try{
                    const resultJob = await this.stockController.processJob('OUT');
                    console.log(resultJob);
                }catch(e){
                    console.log(e.message);
                }
            },
            start: true,
            timeZone: 'America/Sao_Paulo',
        });
    }
}