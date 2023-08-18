<script lang="ts">
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import store from "../utils/store";
  import Button from "./components/Button.svelte";
  import type { Todo } from "../utils/types";

  const addTodo: SubmitFunction = () => {
    if (!$store.newItem.trim()) return;
    $store.newItem = "";

    return async ({ update, result }) => {
      if (result.type === "success")
        $store.todos = [...$store.todos, result.data as Todo];
      await update();
    };
  };
</script>

<form method="post" action="?/add" use:enhance={addTodo}>
  <input
    name="newItem"
    placeholder="What needs to be done?"
    bind:value={$store.newItem}
  />
  <Button text="Add" type="submit" />
</form>

<style>
  form {
    display: flex;
  }

  input {
    width: 100%;
  }
</style>
