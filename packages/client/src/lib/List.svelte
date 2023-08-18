<script lang="ts">
  import type { TodoList } from "../utils/types";
  import ListItem from "./components/ListItem.svelte";

  export let filteredList: { todos: TodoList; count: number };
</script>

<ul>
  {#each filteredList.todos as todo, i (todo.id)}
    <li class="item">
      <ListItem {todo} index={i} />
    </li>
  {/each}
</ul>
<p>
  {filteredList.count} todo{filteredList.count === 1 ? "" : "s"} in the list
</p>

<style>
  ul {
    padding: 0;
    width: inherit;
  }
</style>
