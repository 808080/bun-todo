import Elysia from 'elysia';

const todo = (app: Elysia) => app
  .get('/', () => 'home')
  .get('/todo', () => 'Hi');

export default todo;