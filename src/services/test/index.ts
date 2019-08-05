import * as dotenv from 'dotenv';
import {sequelize} from './config/mysql';
dotenv.config();

import app from './app';
import Server from "../../server.class";

const PORT: Number | any = process.env.TEST_PORT || 3000;


(async () => {
  await sequelize.sync({force: false});
  
  const server = new Server(PORT, app);
})();