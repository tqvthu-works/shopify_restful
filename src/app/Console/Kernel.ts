import 'module-alias/register';
import 'reflect-metadata';
import { Command } from 'commander';
import { ICommand } from '@core/contract';
import fs from 'fs';

class Kernel {
    public static load(): void {
        const program = new Command();
        program.name('CLI tool').description('CLI utilities');
        fs.readdirSync(`${__dirname}/Commands`).forEach(async (file) => {
            const fileName = file.split('.')[0];
            const commandClass = _.get(
                require(`./Commands/${fileName}`),
                fileName,
            );
            if (commandClass) {
                const commandInstance = new commandClass(program) as ICommand;
                await commandInstance.handle(program);
            }
        });

        program.parse();
    }
}
export default Kernel.load();
