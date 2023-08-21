import { writable } from 'svelte/store';
import type { Store } from './types';
import { browser } from '$app/environment';

export const STORAGE_NAME = 'store';

const defaultState: Store = {
  todos: [],
  newItem: ''
};

const createStore = () => {
  const localStore: Store = browser ? JSON.parse(localStorage.getItem(STORAGE_NAME) || JSON.stringify(defaultState)) : defaultState;

  const { subscribe, set, update } = writable<Store>(localStore);

  const methods = {
    setStorage: (store: Store) => localStorage.setItem(STORAGE_NAME, JSON.stringify(store))
  };

  return {
    subscribe,
    set,
    update,
    ...methods
  };
}

const store = createStore();

store.subscribe((store) => {
  if (browser) {
    localStorage.setItem(STORAGE_NAME, JSON.stringify(store));
  }
});

export default store;