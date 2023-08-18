import type { RequestHandler } from './$types';
import http, { HTTPmethods } from '../../../utils/http';
import type { Todo } from '../../../utils/types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, request }) => {
  const data: Todo = await request.json();

  const updatedTodo = await http<Todo>(
    HTTPmethods.PUT,
    "/todo",
    {
      id: data.id,
      done: data.done,
      text: data.text
    },
    { Cookie: cookies.get('auth') }
  );

  return json(updatedTodo);
};