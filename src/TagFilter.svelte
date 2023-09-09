<script lang="ts">
  export let allTags: Set<string> = new Set();
  export let selectedTags: Set<string> = new Set();

  let expanded = false;

  function tagClicked(tag: string) {
    if (selectedTags.has(tag)) {
      selectedTags.delete(tag);
    } else {
      selectedTags.add(tag);
    }
    selectedTags = selectedTags;
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div
  class="tag-filter nav-push"
  tabindex="-1"
  on:click={() => {
    expanded = !expanded;
  }}
  on:keypress={() => {
    expanded = !expanded;
  }}
  on:blur={() => {
    expanded = false;
  }}
>
  Tag Filter
  {#if selectedTags.size > 0}({selectedTags.size} selected){/if}
  {#if expanded}
    <div class="tag-list">
      {#each [...allTags] as tag}
        <div
          on:click|stopPropagation={() => {
            tagClicked(tag);
          }}
          on:keypress|stopPropagation={() => {
            tagClicked(tag);
          }}
        >
          {#if selectedTags.has(tag)}* {tag}{:else}{tag}{/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
