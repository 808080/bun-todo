import Elysia, { t } from 'elysia';
import db from '../db';

const user = (app: Elysia) => app
  .model({
    'user.signup': t.Object({
      username: t.String(),
      password: t.String({
        minLength: 8
      })
    })
  })
  .post('signup',
    async ({ body }) => db.user.create({
      data: body
    }),
    { body: 'user.signup' })
  .get('/user', () => 'user');

export default user;