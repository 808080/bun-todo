import Elysia, { t } from 'elysia';
import db from '../db';
import auth from '../plugins/auth';

const user = (app: Elysia) => app
  .use(auth)
  .model({
    sign: t.Object({
      username: t.String(),
      password: t.String({
        minLength: 8
      })
    }),
    user: t.Object({
      id: t.Integer(),
      username: t.String(),
      passwoed: t.String()
    })
  })
  .post('/signup',
    async ({ body: { username, password } }) => {
      const duplicate = await db.user.findUnique({ where: { username } });
      if (duplicate) return {
        success: false,
        error: 'Username already taken'
      };

      const user = await db.user.create({
        data: {
          username,
          password
        }
      });
      if (!user) return {
        success: false,
        error: 'Invalid input'
      };

      return {
        success: true,
        data: user
      };
    },
    { body: 'sign' })
  .post('/signin',
    async ({ jwt, setCookie, body: { username, password } }) => {
      const user = await db.user.findUnique({ where: { username } });
      if (!user) return {
        success: false,
        error: 'Invalid user'
      };
      if (user.password !== password) return {
        success: false,
        error: 'Invalid password'
      };

      setCookie('auth', await jwt.sign({ username }), {
        httpOnly: true,
        maxAge: 7 * 86400,
      });

      return {
        success: true,
        data: user
      };
    },
    { body: 'sign' })
  .derive(async ({ jwt, cookie: { auth } }) => {
    const profile = await jwt.verify(auth);
    return { username: profile ? profile.username : '' };
  })
  .get('/getUser',
    async ({ username }) => {
      if (!username) return {
        success: false,
        error: 'Unathorized'
      };
      const user = await db.user.findUnique({ where: { username } });
      return {
        success: true,
        data: user
      };
    });

export default user;