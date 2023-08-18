import { fail, redirect, type ServerLoadEvent } from '@sveltejs/kit';
import http, { HTTPmethods } from '../utils/http';
import type { Todo, TodoList, User } from '../utils/types';

export const load = async ({ url, cookies }: ServerLoadEvent) => {
  const cookie = { Cookie: cookies.get('auth') };
  const user = await http<User>(HTTPmethods.GET, '/getUser', null, cookie);

  if (url.pathname !== '/signin' && !user.success) {
    throw redirect(301, '/signin');
  }

  const res = await http<TodoList>(HTTPmethods.GET, '/todos', null, cookie);
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
    const text = String(formData.get('newItem'));

    if (!text) {
      return fail(400, { text, missing: true });
    }

    const newItem = await http<Todo>(HTTPmethods.POST, '/todo', { text }, { Cookie: cookies.get('auth') });
    return newItem.success ? newItem.data : newItem.error;
  },
  all: async ({ cookies }) => {
    const todos = await http<TodoList>(HTTPmethods.GET, '/todos', null, { Cookie: cookies.get('auth') });
    return todos;
  },
  active: async ({ cookies }) => {
    const todos = await http<TodoList>(HTTPmethods.GET, '/todos?done=false', null, { Cookie: cookies.get('auth') });
    return todos;
  },
  done: async ({ cookies }) => {
    const todos = await http<TodoList>(HTTPmethods.GET, '/todos?done=true', null, { Cookie: cookies.get('auth') });
    return todos;
  }
};