import Express from 'express';
import fs from 'fs';
import path from 'path';

const ApiRouter = Express.Router();
const apiDir = path.join(__dirname, 'api');
const files = fs.readdirSync(apiDir);

files.forEach((file: string) => {
    const fileName = file.split('.')[0];
    const router = require(path.join(apiDir, fileName)).default;
    ApiRouter.use(router);
});

export { ApiRouter };
