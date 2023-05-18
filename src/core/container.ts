import * as fs from 'fs';
import * as path from 'path';

export class Container {
    public static load(): void {
        /* Bind Model */
        const directoryPath = path.join(__dirname, '../app/Models');
        const files = fs.readdirSync(directoryPath);
        files.forEach((file) => {
            const filePath = `${directoryPath}/${file}`;
            const fileStats = fs.statSync(filePath);
            if (fileStats.isDirectory()) {
                return;
            }
            const [className, _] = file.split('.js');
            const model = require(`@app/Models/${className}`)[className];
            container.bind<typeof model>(className).toConstantValue(model);
        });
    }
}
