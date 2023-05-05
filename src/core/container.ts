import * as fs from 'fs';
import * as path from 'path';

export class Container {
    public static load(): void {
        const directoryPath = path.join(__dirname, '../app/Services');
        const files = fs.readdirSync(directoryPath);

        files.forEach((file) => {
            const [className, _] = file.split('.js');
            const service = require(`@app/Services/${className}`)[className];
            container.bind(service).toSelf();
        });
    }
}
