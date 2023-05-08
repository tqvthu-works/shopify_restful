import { Sequelize, Options } from 'sequelize';

export class Database {
    private static instance: Sequelize;

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            const dbConfig = require('../config/database');
            Database.instance = new Sequelize(dbConfig as Options);
        }
        return Database.instance;
    }
}
export const sequelize = Database.getInstance();
