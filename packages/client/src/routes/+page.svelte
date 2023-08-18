<script lang="ts">
  import AddItem from "$lib/AddItem.svelte";
  import List from "$lib/List.svelte";
  import Filter from "$lib/Filter.svelte";
  import { enhance } from "$app/forms";
  import store from "../utils/store";
  import type { PageData } from "./$types";

  export let data: PageData;

  $store.todos = data.todos;
</script>

<form action="?/logout" method="post" use:enhance>
  <button type="submit">Log out</button>
</form>

<main>
  <AddItem />
  <List filteredList={{ todos: $store.todos, count: $store.todos.length }} />
  <Filter />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    width: 320px;
  }
</style>
