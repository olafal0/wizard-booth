<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{
    newTag: string;
    removeTag: string;
  }>();

  export let tags: string[] = [];
  let newTagEntry: HTMLSpanElement;

  function deleteTag(tag: string) {
    tags = tags.filter((t) => t !== tag);
    dispatch("removeTag", tag);
  }

  function newTagKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const newTag = newTagEntry.innerText;
      tags = [...tags, newTag];
      newTagEntry.innerText = "";
      event.preventDefault();
      dispatch("newTag", newTag);
    }
  }
</script>

<div class="tag-edit">
  {#each tags as tag}
    <span class="existing-tag">
      {tag}
      <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
      <span
        class="tag-delete"
        on:click={() => {
          deleteTag(tag);
        }}
      >
        &times;
      </span>
    </span>
  {/each}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
  <span
    class="new-tag-editor"
    contenteditable="true"
    bind:this={newTagEntry}
    on:keydown|capture={newTagKeyDown}
  />
</div>
