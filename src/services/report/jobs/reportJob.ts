import * as cron from "cron";
import {ReportController} from "../controllers/reportController";

export class ReportJobs{ 
    public reportController:ReportController = new ReportController();

    public async startJobs(){
        const jobProcessOrder = new cron.CronJob({
            cronTime: '*/1 * * * *', // A cada 10minutos 
            onTick: async () => {
                try{
                    const resultJob = await this.reportController.processJob();
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