import Express from 'express';
import { AuthController } from '@app/Http/Controllers/AuthController';

const AuthRouter = Express.Router();
AuthRouter.get('/install', ActionHandler(AuthController, 'install'));
AuthRouter.get('/auth/callback', ActionHandler(AuthController, 'authCallback'));
export default AuthRouter;
