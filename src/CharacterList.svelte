<script lang="ts">
  import Character from "./Character.svelte";
  import TagFilter from "./TagFilter.svelte";
  import NPC from "./npc";
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let characters: NPC[] = [];
  let allTags: Set<string> = new Set();
  let selectedTags: Set<string> = new Set();

  let draggedNPC: NPC;

  function createNew() {
    characters = [new NPC(), ...characters];
  }

  function deleteNPC(event: CustomEvent<NPC>) {
    const npc = event.detail;
    characters = characters.filter((c) => c !== npc);
  }

  function tagChange() {
    // Trigger reactive assignment when tag values change in any character
    allTags = allTags;
  }

  function dragstart(event: CustomEvent<NPC>) {
    draggedNPC = event.detail;
  }

  function drop(event: CustomEvent<NPC>) {
    if (!draggedNPC) {
      console.warn("No dragged NPC");
      return;
    }
    const droppedNPC = event.detail;
    // Get the initial index that we dropped on
    const droppedIndex = characters.indexOf(droppedNPC);
    // Remove dropped npc from characters list
    characters = characters.filter((c) => c !== draggedNPC);
    // Add the NPC to the slot that we dropped on
    characters.splice(droppedIndex, 0, draggedNPC);
    // Self-assignment for reactivity purposes
    characters = characters;
  }

  $: {
    allTags = new Set();
    characters.forEach((npc) => {
      npc.tags.forEach((tag) => {
        allTags.add(tag);
      });
    });
  }

  function save() {
    dispatch("save");
  }
</script>

<nav>
  <h1>Wizard Booth</h1>
  <TagFilter bind:allTags bind:selectedTags />
  <button class="borderless" on:click={createNew}>New Character</button>
  <button class="borderless" on:click={save}>Save</button>
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
        on:drop={drop}
      />
    {/if}
  {/each}
</div>
