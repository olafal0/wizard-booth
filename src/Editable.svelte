<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{
    updated: { key: string; content: string | number };
  }>();

  export let content: string | number = "";
  export let key = "";
  export let inputType = "text";

  let editing = false;

  function keypress(event: KeyboardEvent) {
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

{#if editing}
  {#if inputType === "text"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="text"
      on:keydown={keypress}
      on:blur={cancelEdit}
      bind:value={content}
      autofocus
    />
  {:else if inputType === "number"}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      type="number"
      on:keydown={keypress}
      on:blur={cancelEdit}
      bind:value={content}
      autofocus
    />
  {/if}
{:else}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <span
    on:click={() => {
      editing = true;
    }}
  >
    {content}
  </span>
{/if}

<style lang="scss">
  input[type="number"] {
    width: 40px;
  }
  input[type="text"] {
    width: 100%;
  }
</style>
