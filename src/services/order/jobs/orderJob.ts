import * as cron from "cron";
import {OrderController} from "../controllers/orderController";

export class OrderJobs{ 
    public orderController:OrderController = new OrderController();

    public async startJobs(){
        const jobProcessOrder = new cron.CronJob({
            cronTime: '*/30 * * * * *', // A cada 30s 
            onTick: async () => {
                try{
                    const resultJob = await this.orderController.processJob();
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