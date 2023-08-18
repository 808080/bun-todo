import type { RequestHandler } from './$types';
import http, { HTTPmethods } from '../../../utils/http';
import type { Todo } from '../../../utils/types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, request }) => {
  const data: Todo = await request.json();

  const deletedTodo = await http<Todo>(
    HTTPmethods.DELETE,
    "/todo",
    {
      id: data.id
    },
    { Cookie: cookies.get('auth') }
  );

  return json(deletedTodo);
};