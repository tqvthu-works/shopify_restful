import { Container } from 'inversify';
import { handler } from "@core/http/controller-handler"
declare global {
    var ActionHandler: typeof handler;
    var country: string;
    var container: Container;
    var _: any;
    function multiply(a: number, b: number): number;
}

export {};
