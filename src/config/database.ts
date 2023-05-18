import 'dotenv/config';
import { IConnectionOptions, Dialect } from '../contract/database';

const dbConfig: IConnectionOptions = {
    port: process.env.DB_PORT ?? 3306,
    host: process.env.DB_HOST ?? 'localhost',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: (process.env.DB_CONNECTION ?? 'mysql') as Dialect,
    migrationStorageTableName: 'migrations',
};
/**
 * Use module.exports instead of export default because
 * Sequelize CLI tool does not support using export default syntax in your Sequelize configuration files.
 */
module.exports = dbConfig;
export { dbConfig };
