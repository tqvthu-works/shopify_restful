import { Request, Response, NextFunction, RequestHandler } from 'express';
export const handler = <C = any>(
    controller: C,
    action: string,
): RequestHandler => {
    const fnc: RequestHandler = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            await controller[action](req, res);
        } catch (err) {
            return next(err); // pass the error to the error handling middleware
        }
    };
    return fnc;
};
