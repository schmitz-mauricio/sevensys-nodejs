import {Sequelize} from 'sequelize-typescript';

// @ts-ignore
export const sequelize = new Sequelize("nodejs_sevensys","localhost","localhost", {host: "127.0.0.1", dialect: "mysql", operatorsAliases: false, models: [__dirname + '/../models'] });
  