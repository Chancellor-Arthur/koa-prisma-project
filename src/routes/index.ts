import Router from '@koa/router';
import Koa from 'koa';
import registerUserRoutes from './users';

export function registerRoutes(app: Koa) {
  const router = new Router();

  if (process.env.API_PREFIX) router.prefix(process.env.API_PREFIX);

  registerUserRoutes(router);

  app.use(router.routes());
}
