<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let content = "";
  export let key = "";

  let editing = false;

  function keypress(event) {
    if (event.key === "Enter") {
      editing = false;
      dispatch("updated", { key, content });
    }
    if (event.key === "Escape") {
      editing = false;
    }
    console.log(event.key);
  }

  function cancelEdit() {
    editing = false;
  }
</script>

{#if editing}
  <!-- svelte-ignore a11y-autofocus -->
  <input
    type="text"
    on:keydown={keypress}
    on:blur={cancelEdit}
    bind:value={content}
    autofocus />
{:else}
  <span
    on:click={() => {
      editing = true;
    }}
    on:keydown={keypress}>
    {content}
  </span>
{/if}
