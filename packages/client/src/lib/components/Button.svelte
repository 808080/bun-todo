<script lang="ts">
  export let type: "button" | "submit" | "reset" | null | undefined;
  export let text: string;
  export let classList: string = "";
  export let formaction: string | undefined = undefined;
  export let disabled: boolean = false;
</script>

<button on:click {type} class={classList} {formaction} {disabled}>
  {text}
</button>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    color: #ff3e00;
    background-color: rgba(255, 62, 0, 0.1);
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }

  .delete {
    margin-left: auto;
  }

  .filter {
    margin: 0 5px;
    text-transform: capitalize;
  }
</style>
