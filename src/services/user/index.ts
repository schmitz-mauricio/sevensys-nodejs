import Server from "../../server.class";
import * as dotenv from "dotenv";
import {sequelize} from './config/mysql';

import app from "./app";

const PORT: Number | any = process.env.USER_PORT || 3003;

(async () => {
    await sequelize.sync({force: false});

    const server = new Server(PORT, app);
})();

