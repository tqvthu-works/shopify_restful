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
            .action(async function (foo, bar) {
                console.log(`foo=${foo}`, `bar=${bar}`, 'args=', this.args);
            });
    }
}
