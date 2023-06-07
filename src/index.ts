import dotenv from 'dotenv';
import Koa from 'koa';
import cors from '@koa/cors';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import { registerRoutes } from './routes';
import * as process from 'process';
import prisma from './prisma';
import { get } from 'lodash';

dotenv.config({ path: require('find-config')('.env') });

async function main() {
  const app = new Koa();
  const PORT = process.env.PORT ? +process.env.PORT : 3000;
  const HOST = process.env.HOST ?? 'localhost';

  /** Middlewares */
  app.use(json());
  app.use(logger());
  app.use(bodyParser());
  app.use(cors());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const status = get(err, 'statusCode', get(err, 'status', 500));
      const message = get(err, 'message', 'Unexpected');
      const context = get(err, 'context', null);

      ctx.status = status;
      ctx.body = {
        status,
        message,
        context,
        timestamp: new Date().toISOString(),
      };
      ctx.app.emit('error', err, ctx);
    }
  });

  /** Routes */
  registerRoutes(app);

  await app.listen(PORT, HOST);
  console.info(`Server started: http://localhost:${PORT}`);
}

main()
  .then(() => {
    prisma.$disconnect();
  })
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
