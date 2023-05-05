export interface IRedisConfig {
    [index: string]: {
        host: string;
        port: string;
        password: string;
        db: string | number;
    };
}
