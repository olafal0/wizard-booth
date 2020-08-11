<script>
  import Character from "./Character";
  import TagFilter from "./TagFilter";
  import NPC from "./npc";
  import { onMount } from "svelte";
  import { remote } from "electron";

  export let characters = [];
  let allTags = new Set();
  let selectedTags = new Set();

  let draggedNPC;

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

  function dragstart(event) {
    draggedNPC = event.detail;
  }

  function drop(event) {
    if (!draggedNPC) {
      console.warn("No dragged NPC");
      return;
    }
    const droppedNPC = event.detail;
    // Get the initial index that we dropped on
    const droppedIndex = characters.indexOf(droppedNPC);
    // Remove dropped npc from characters list
    characters = characters.filter(c => c !== draggedNPC);
    // Add the NPC to the slot that we dropped on
    characters.splice(droppedIndex, 0, draggedNPC);
    // Self-assignment for reactivity purposes
    characters = characters;
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
        on:removeTag={tagChange}
        on:dragstart={dragstart}
        on:drop={drop} />
    {/if}
  {/each}
</div>
