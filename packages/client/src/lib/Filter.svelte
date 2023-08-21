<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/Button.svelte";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { filters, type Filters, type TodoList } from "../utils/types";
  import type { ResponseMessage } from "../utils/http";

  let selected: Filters;

  const handleFilter: SubmitFunction<ResponseMessage<TodoList>> = ({
    formData,
    submitter,
  }) => {
    selected = submitter?.textContent as Filters;
    formData.append("filter", selected);
    return async ({ update }) => {
      await update();
    };
  };
</script>

<form method="post" use:enhance={handleFilter}>
  {#each filters as filter}
    <Button
      text={filter}
      type="submit"
      classList="filter"
      disabled={selected === filter}
      formaction={"?/getTodos"}
    />
  {/each}
</form>
