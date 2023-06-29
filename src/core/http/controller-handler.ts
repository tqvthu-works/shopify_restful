import { Request, Response, NextFunction, RequestHandler } from 'express';
import { interfaces } from 'inversify';
export const handler = <C extends interfaces.Newable<any>>(
    ControllerClass: C,
    action: string,
): RequestHandler => {
    const fnc: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const controller = container.resolve(ControllerClass);
            await controller[action](req, res);
        } catch (err) {
            return next(err); // pass the error to the error handling middleware
        }
    };
    return fnc;
};
