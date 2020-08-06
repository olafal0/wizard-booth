<script>
  export let allTags;
  export let selectedTags;

  let expanded = false;

  function tagClicked(tag) {
    if (selectedTags.has(tag)) {
      selectedTags.delete(tag);
    } else {
      selectedTags.add(tag);
    }
    selectedTags = selectedTags;
  }
</script>

<div
  class="tag-filter"
  tabindex="-1"
  on:click={() => {
    expanded = !expanded;
  }}
  on:blur={() => {
    expanded = false;
  }}>
  Tag Filter
  {#if selectedTags.size > 0}({selectedTags.size} selected){/if}
  {#if expanded}
    <div class="tag-list">
      {#each [...allTags] as tag}
        <div
          on:click|stopPropagation={() => {
            tagClicked(tag);
          }}>
          {#if selectedTags.has(tag)}* {tag}{:else}{tag}{/if}
        </div>
      {/each}
    </div>
  {/if}
</div>
