<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let tags = [];
  let newTagEntry;

  function deleteTag(tag) {
    tags = tags.filter(t => t !== tag);
    dispatch("removeTag", tag);
  }

  function newTagKeyDown(event) {
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
      <span
        class="tag-delete"
        on:click={() => {
          deleteTag(tag);
        }}>
        &times;
      </span>
    </span>
  {/each}
  <span
    class="new-tag-editor"
    contenteditable="true"
    bind:this={newTagEntry}
    on:keydown|capture={newTagKeyDown} />
</div>
