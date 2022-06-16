import { Router } from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import OrderController from './controllers/OrderController';

import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/orderSeed', OrderController.orderSeed);
routes.post('/proof/session', SessionController.store);

routes.use(authMiddleware);

routes.get('/proof/dashboard', OrderController.orderGet);















export default routes;