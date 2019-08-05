import {Sequelize} from 'sequelize-typescript';

// @ts-ignore
export const sequelize = new Sequelize("mauricio","nodejs","sevensys", {host: "mysql-nodejs.mauricioschmitz.com.br", port: 3307, dialect: "mysql", operatorsAliases: false, models: [__dirname + '/../models'] });
  