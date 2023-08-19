<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/Button.svelte";
  import type { SubmitFunction } from "@sveltejs/kit";
  import store from "../utils/store";
  import type { Todo } from "../utils/types";

  const addTodo: SubmitFunction<Todo> = ({ action }) => {
    action.search = "?/add";
    const text = $store.newItem.trim();
    if (!text) return;
    $store.newItem = "";

    return async ({ update, result }) => {
      if (result.type === "success" && result.data)
        $store.todos = [...$store.todos, result.data];
      await update();
    };
  };
</script>

<form method="post" use:enhance={addTodo}>
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
