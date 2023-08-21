<script lang="ts">
  import AddItem from "$lib/AddItem.svelte";
  import List from "$lib/List.svelte";
  import Filter from "$lib/Filter.svelte";
  import { enhance } from "$app/forms";
  import store from "../utils/store";
  import type { PageData } from "./$types";
  import Button from "$lib/components/Button.svelte";

  export let data: PageData;

  $store.todos = data.todos;
</script>

<form class="logout" action="?/logout" method="post" use:enhance>
  <Button type="submit" text="Log out" />
</form>

<AddItem />
<List filteredList={{ todos: $store.todos, count: $store.todos.length }} />
<Filter />

<style>
  .logout {
    margin-bottom: 20px;
    text-align: start;
  }
</style>
