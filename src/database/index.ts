import { Sequelize, Options } from 'sequelize';
import { APP_ENVS } from '@constant/app';

export class Database {
    private static instance: Sequelize;

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            const dbConfig = require('../config/database') as Options;
            if (process.env.APP_ENV != APP_ENVS.LOCAL) {
                dbConfig.logging = false;
            }

            Database.instance = new Sequelize(dbConfig);
        }
        return Database.instance;
    }
}
export const sequelize = Database.getInstance();
