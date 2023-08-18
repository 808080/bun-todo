export type User = {
  id: string;
  username: string;
};

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export const filters = ['all', 'active', 'done'] as const;
export type Filters = typeof filters[number];

export type TodoList = Array<Todo>;

export type Store = {
  todos: TodoList;
  newItem: string;
};