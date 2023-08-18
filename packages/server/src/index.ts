import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import todo from './controllers/todo';
import user from './controllers/user';

export const app = new Elysia()
  .use(cors())
  .use(user)
  .use(todo)
  .listen(process.env.PORT || 3000);

console.log(
  `Server is running at ${app.server?.hostname}:${app.server?.port}`
);