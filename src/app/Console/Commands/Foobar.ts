import { ICommand } from '@core/contract';
import { Command } from 'commander';

export class Foobar implements ICommand {
    private signature = 'foo:bar';
    protected description = 'Foobar command description';
    public async handle(program: Command): Promise<void> {
        program.name('Foobar command').description(this.description);
        program
            .command(this.signature)
            .description(this.description)
            .argument('<foo>')
            .argument('<bar>')
            .action(
                async function (foo, bar): Promise<void> {
                    await this.process(foo, bar);
                    console.log(foo, bar, program.args);
                }.bind(this)
            );
    }
    private async process(foo: string, bar: string, args?: string[]): Promise<void> {
        /**
         * logic code here
         */
        return;
    }
}
