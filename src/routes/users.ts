import Router from '@koa/router';
import prisma from '../prisma';
import { type } from 'arktype';
import { BadRequestError } from '../lib/errors';

export default function registerUserRoutes(router: Router, prefix = '/users') {
  router.post([prefix], async (ctx) => {
    const userValidator = type({
      name: 'string',
      age: 'number',
    });

    const user = userValidator(ctx.request.body);

    if (user.problems?.length || !user.data) throw new BadRequestError(user.problems[0].message);

    ctx.body = await prisma.user.create({ data: user.data });
  });

  router.get([prefix], async (ctx) => {
    ctx.body = await prisma.user.findMany();
  });
}
