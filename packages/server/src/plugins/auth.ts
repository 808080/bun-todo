import Elysia from 'elysia';
import jwt from '@elysiajs/jwt';
import cookie from '@elysiajs/cookie';

const auth = (app: Elysia) => app
  .use(jwt({
    name: 'jwt',
    secret: process.env.JWT_SECRET || 'secret'
  }))
  .use(cookie());

export default auth;