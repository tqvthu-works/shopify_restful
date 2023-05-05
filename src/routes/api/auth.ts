import Express from 'express';
import { AuthController } from '@app/Http/Controllers/AuthController';
import { handler } from '@core/http/controller-handler';
/* Resolve dependency injection for AuthController*/
const authController = container.resolve<AuthController>(AuthController);

const AuthRouter = Express.Router();
AuthRouter.get('/install', handler(authController, 'install'));
AuthRouter.get('/auth/callback', handler(authController, 'authCallback'));
export default AuthRouter;
