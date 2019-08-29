import * as cron from "cron";
import {StockController} from "../controllers/stockController";

export class StockJobs{ 
    public stockController:StockController = new StockController();

    public async startJobs(){
        const jobProcessStock = new cron.CronJob({
            // Seconds: 0-59
            // Minutes: 0-59
            // Hours: 0-23
            // Day of Month: 1-31
            // Months: 0-11 (Jan-Dec)
            // Day of Week: 0-6 (Sun-Sat
            cronTime: '*/30 * * * * *', // A cada 30s 
            onTick: async () => {
                try{
                    const resultJob = await this.stockController.processJob();
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