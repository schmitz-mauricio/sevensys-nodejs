import {Sequelize} from 'sequelize-typescript';
import {mysqlDefaults} from '../../../config/mysql';

mysqlDefaults.options.models = [__dirname + '/../models'];

export const sequelize = new Sequelize(
    mysqlDefaults.database,
    mysqlDefaults.user,
    mysqlDefaults.password, 
    // @ts-ignore
    mysqlDefaults.options
);
  