<script lang="ts">
  import AddItem from "$lib/AddItem.svelte";
  import List from "$lib/List.svelte";
  import Filter from "$lib/Filter.svelte";
  import { enhance } from "$app/forms";
  import type { PageData } from "./$types";
  import Button from "$lib/components/Button.svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import type { TodoList } from "../utils/types";

  export let data: PageData;

  const todos = writable<TodoList>();
  $: todos.set(data.todos);
  setContext("todos", todos);
</script>

<form class="logout" action="?/logout" method="post" use:enhance>
  <Button type="submit" text="Log out" />
</form>

<AddItem />
<List />
<Filter />

<style>
  .logout {
    margin-bottom: 20px;
    text-align: start;
  }
</style>
