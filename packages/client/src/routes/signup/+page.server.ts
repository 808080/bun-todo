import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import http, { HTTPmethods } from '../../utils/http.js';
import type { User } from '../../utils/types.js';

export const load = ({ cookies }: ServerLoadEvent) => {
  const localUser = cookies.get('auth');
  if (localUser) {
    throw redirect(303, '/');
  }
};

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    const user = await http<User>(HTTPmethods.POST, '/signup', { username, password });

    if (user.success) {
      throw redirect(303, '/signin');
    }
  }
};