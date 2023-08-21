<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/components/Button.svelte";

  let username = "";
  let password = "";

  const handleSubmit = (e: Event) => {
    if (username.trim().length === 0 || password.trim().length < 8) {
      e.preventDefault();
      return;
    }
  };
</script>

<form method="POST" use:enhance>
  <h2>Sign up</h2>

  <div>
    <label>
      Username
      <input type="text" name="username" bind:value={username} required />
    </label>
  </div>

  <div>
    <label>
      Password
      <input type="text" name="password" bind:value={password} required />
    </label>
  </div>

  <div>
    <Button type="submit" on:click={handleSubmit} text="Submit" />
  </div>

  <p><a href="/signin">Sign in</a></p>
</form>
