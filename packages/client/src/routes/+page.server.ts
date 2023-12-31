import { fail, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import http, { HTTPmethods } from '../utils/http';
import type { Filters, Todo, TodoList, User } from '../utils/types';

export const load = async ({ url, cookies }: ServerLoadEvent) => {
  const cookie = { Cookie: cookies.get('auth') };
  const user = await http<User>(HTTPmethods.GET, '/getUser', null, cookie);

  if (url.pathname !== '/signin' && !user.success) {
    throw redirect(301, '/signin');
  }

  const res = await getTodos(cookie, cookies.get('filter') as Filters);
  return {
    todos: res.success ? res.data : []
  };
};

export const actions = {
  logout: ({ cookies }) => {
    cookies.delete('auth');
  },
  add: async ({ request, cookies }) => {
    const formData = await request.formData();
    const text = String(formData.get('newItem')).trim();
    const filter = cookies.get('filter') as Filters;

    if (!text) {
      return fail(400, { text, missing: true });
    }

    const newItem = await http<Todo>(HTTPmethods.POST, '/todo', { text, done: filter === 'done' }, { Cookie: cookies.get('auth') });
    return newItem.success ? newItem.data : newItem.error;
  },
  getTodos: async ({ cookies, request }) => {
    const formData = await request.formData();
    const filter = String(formData.get('filter')) as Filters;
    cookies.set('filter', filter);

    const todos = await getTodos({ Cookie: cookies.get('auth') }, filter);
    return todos;
  }
};

const getTodos = async (cookies: Record<string, string | undefined>, filter: Filters) => {
  const isDone = filter === 'all' ? '' :
    filter === 'done' ? '?done=true' : '?done=false'

  const todos = await http<TodoList>(HTTPmethods.GET, '/todos' + isDone, null, cookies);
  return todos;
}