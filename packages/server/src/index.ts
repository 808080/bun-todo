import { Elysia } from 'elysia';
import todo from './controllers/todo';
import user from './controllers/user';

const app = new Elysia()
  .use(user)
  .use(todo)
  .listen(process.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
