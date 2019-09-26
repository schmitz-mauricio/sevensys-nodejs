import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';
import Server from "../../server.class";

const PORT: Number | any = process.env.REPORT_PORT || 3006;


(async () => {
  const server = new Server(PORT, app);
})();