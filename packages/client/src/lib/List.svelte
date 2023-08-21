<script lang="ts">
  import { getContext } from "svelte";
  import type { TodoList } from "../utils/types";
  import ListItem from "./components/ListItem.svelte";
  import type { Writable } from "svelte/store";

  const todos = getContext<Writable<TodoList>>("todos");
</script>

<ul>
  {#each $todos as todo, i (todo.id)}
    <li class="item">
      <ListItem {todo} index={i} />
    </li>
  {/each}
</ul>
<p>
  {$todos.length} todo{$todos.length === 1 ? "" : "s"} in the list
</p>

<style>
  ul {
    padding: 0;
    width: inherit;
  }
</style>
