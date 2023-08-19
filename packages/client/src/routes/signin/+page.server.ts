import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import http, { HTTPmethods } from '../../utils/http';
import type { User } from '../../utils/types';

export const load = ({ cookies }: ServerLoadEvent) => {
  const localUser = cookies.get('auth');
  if (localUser) {
    throw redirect(301, '/');
  }
};

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    const user = await http<User & { token: string }>(HTTPmethods.POST, '/signin', { username, password });

    if (user.success) {
      if (user.cookies) cookies.set('auth', user.cookies);
      throw redirect(301, '/');
    }
  }
};