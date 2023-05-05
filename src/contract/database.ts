import { ConnectionOptions, Dialect, Options } from 'sequelize';
export interface IConnectionOptions extends ConnectionOptions {
    migrationStorageTableName: 'migrations';
    dialect: Dialect;
    options?: Options;
}
export { Dialect, Options };
