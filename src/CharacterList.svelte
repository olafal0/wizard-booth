<script>
  import Character from "./Character";
  import TagFilter from "./TagFilter";
  import NPC from "./npc";
  import { onMount } from "svelte";
  import { remote } from "electron";

  export let characters = [];
  let allTags = new Set();
  let selectedTags = new Set();

  function createNew() {
    characters = [new NPC(), ...characters];
  }

  function deleteNPC(event) {
    const npc = event.detail;
    characters = characters.filter(c => c !== npc);
  }

  function tagChange(event) {
    // Trigger reactive assignment when tag values change in any character
    allTags = allTags;
  }

  $: {
    allTags = new Set();
    characters.forEach(npc => {
      npc.tags.forEach(tag => {
        allTags.add(tag);
      });
    });
  }
</script>

<nav>
  <h1>Wizard Booth</h1>
  <TagFilter bind:allTags bind:selectedTags />
  <button class="borderless" on:click={createNew}>New Character</button>
</nav>

<div class="flex-container">
  {#each characters as npc (npc.name)}
    {#if selectedTags.size === 0 || npc.matchesTags([...selectedTags])}
      <Character
        {npc}
        on:delete={deleteNPC}
        on:newTag={tagChange}
        on:removeTag={tagChange} />
    {/if}
  {/each}
</div>
