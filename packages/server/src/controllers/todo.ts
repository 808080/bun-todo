import Elysia, { t } from 'elysia';
import auth from '../plugins/auth';
import db from '../db';

const todo = (app: Elysia) => app
  .use(auth)
  .derive(async ({ jwt, cookie: { auth } }) => {
    const profile = await jwt.verify(auth);
    if (!profile) throw new Error('Unauthorized');
    const user = await db.user.findUnique({ where: { username: profile.username } });
    if (!user) throw new Error('Unauthorized');
    return { userId: user.id };
  })
  .get('/todos', async ({ userId, query: { done } }) => {
    const doneBool = done ? done === 'true' : undefined;
    const todos = await db.task.findMany({ where: { userId, done: doneBool }, orderBy: { created: 'asc' } });

    return {
      success: true,
      data: todos
    };
  }, { query: t.Object({ done: t.Optional(t.String()) }) })
  .post('/todo', async ({ userId, body: { text } }) => {
    const todo = await db.task.create({
      data: { text, userId }
    });

    return {
      success: true,
      data: todo
    };
  }, { body: t.Object({ text: t.String() }) })
  .delete('/todo', async ({ userId, body: { id } }) => db.task.delete({
    where: {
      id,
      userId
    }
  }), { body: t.Object({ id: t.Number() }) })
  .put('/todo', async ({ userId, body }) => {
    const todo = await db.task.update({ where: { userId, id: body.id }, data: body });
    return todo;
  }, { body: t.Object({ id: t.Number(), text: t.String(), done: t.Boolean() }) });

export default todo;