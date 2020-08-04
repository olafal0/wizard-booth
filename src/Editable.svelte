<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let content = "";
  export let key = "";
  export let inputType = "text";

  let editing = false;

  function keypress(event) {
    if (event.key === "Enter") {
      editing = false;
      dispatch("updated", { key, content });
    }
    if (event.key === "Escape") {
      editing = false;
    }
  }

  function cancelEdit() {
    editing = false;
  }
</script>

<style lang="scss">
  input[type="number"] {
    width: 40px;
  }
</style>

{#if editing}
  {#if inputType === 'text'}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      on:keydown={keypress}
      on:blur={cancelEdit}
      bind:value={content}
      autofocus />
  {:else if inputType === 'number'}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="number"
      on:keydown={keypress}
      on:blur={cancelEdit}
      bind:value={content}
      autofocus />
  {/if}
{:else}
  <span
    on:click={() => {
      editing = true;
    }}
    on:keydown={keypress}>
    {content}
  </span>
{/if}
