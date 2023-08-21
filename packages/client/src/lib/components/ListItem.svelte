<script lang="ts">
  import { HTTPmethods } from "../../utils/http";
  import type { Todo } from "../../utils/types";
  import Button from "./Button.svelte";
  import { invalidateAll } from "$app/navigation";

  export let todo: Todo;
  export let index: number;

  let initText: string;
  let isEdit = false;

  const handleBlur = async () => {
    const val = todo.text.trim();
    if (!val) {
      todo.text = initText;
      isEdit = false;
      return;
    }
    todo.text = val;
    await fetch("/api/update", {
      method: HTTPmethods.POST,
      body: JSON.stringify(todo),
    });

    isEdit = false;
  };

  const handleChange = async () => {
    await fetch("/api/update", {
      method: HTTPmethods.POST,
      body: JSON.stringify(todo),
    });
  };

  const handleDelete = async () => {
    const res = await fetch("/api/remove", {
      method: HTTPmethods.POST,
      body: JSON.stringify(todo),
    });

    const result: Todo = await res.json();

    if (result.id) {
      await invalidateAll();
    }
  };
</script>

<div class="list-item {todo.done ? 'completed' : ''}">
  <input
    type="checkbox"
    class="done"
    bind:checked={todo.done}
    on:change={handleChange}
  />
  {#if isEdit}
    <input type="text" bind:value={todo.text} on:blur={handleBlur} />
  {:else}
    <div
      role="textbox"
      tabindex={index}
      on:dblclick={() => ((isEdit = true), (initText = todo.text))}
      class="text"
    >
      {todo.text}
    </div>
  {/if}
  <Button classList="delete" text="✘" type="button" on:click={handleDelete} />
</div>

<style>
  .list-item {
    text-align: left;
    display: flex;
    align-items: center;
    margin: 10px;
  }

  .done {
    margin-right: 10px;
  }

  .completed {
    text-decoration: line-through;
  }

  .text {
    width: 100%;
    cursor: text;
  }
</style>
