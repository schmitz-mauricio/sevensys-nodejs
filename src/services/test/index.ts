import * as dotenv from 'dotenv';
dotenv.config();

import app from './app';
import Server from "../../server.class";

const PORT: Number | any = process.env.TEST_PORT || 3000;
const server = new Server(PORT, app);