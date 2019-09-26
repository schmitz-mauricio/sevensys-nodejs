import { Request, Response, request } from 'express';
import {Customer} from "../structure/customer";
import * as moment from "moment";
import * as _ from "lodash";
import { resolveSoa } from 'dns';
const logger = require('../../../helpers/logger');

const fs = require('fs');
const { convertArrayToCSV } = require('convert-array-to-csv');
const Client = require('ssh2-sftp-client');

export class ReportController{
    public customer: Customer = new Customer();

    public async processJob(page = 0, stream = null){
        try {
            const stream = this.createFile();
            stream.once('open', async(fd) => {
                await this.writeFile(stream);
            });
        } catch (e) {
            return false
        }
    }

    public async writeFile(stream, page=0){
        try {
            const list:any = await this.customer.find(page);
            
            if(list.length){
                const csvFromArrayOfObjects = await convertArrayToCSV(list, {
                    separator: ';',
                });

                let aux = '';
                const lines = csvFromArrayOfObjects.split('\n');
                lines.splice((lines.length-1), 1);
                if(page > 0){
                    lines.splice(0, 1);
                    aux = '\n';
                }

                let newtext = lines.join('\n');

                stream.write(aux + newtext);
                await this.writeFile(stream, page+1);
            } else {
                const filePath = stream.path;
                stream.end();
                await this.enviarArquivo(filePath);
            }
        } catch (e) {
            return false
        }
    }

    public createFile(){
        return fs.createWriteStream(`files/customers_${moment().format('YYYY-MM-DD-HH-mm-SS')}.csv`);
    }

    public async enviarArquivo(filePath){
        try{

            var Client = require('ftp');
            var c = new Client();
            c.on('ready', function() {
                c.put(filePath, 'meuarquivo.csv', (error) => {
                    c.end();
                });
            });
            // connect to localhost:21 as anonymous
            c.connect({
                host: 'mauricioschmitz.com.br',
                user: 'u112741921.nodejs',
                password: 'sevensys',
                port: 21,
            });
            
        } catch (e) {
            return false
        }
    }
}