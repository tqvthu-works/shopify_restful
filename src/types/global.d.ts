import { Container } from 'inversify';
declare global {
    var country: string;
    var container: Container;
    var _: any;
    function multiply(a: number, b: number): number;
}

export {};
