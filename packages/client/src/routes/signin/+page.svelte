<script lang="ts">
  import { enhance } from "$app/forms";

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
  <h2>Sign in</h2>

  <label>
    <input type="text" name="username" bind:value={username} required />
  </label>

  <label>
    <input type="text" name="password" bind:value={password} required />
  </label>

  <button type="submit" on:click={handleSubmit}>Submit</button>

  <p><a href="/signup">Sign up</a></p>
</form>
