<script>
  import Character from "./Character";
  import NPC from "./npc";
  import { onMount } from "svelte";
  import { remote } from "electron";

  export let characters = [];

  onMount(() => {});

  function createNew() {
    characters = [new NPC(), ...characters];
  }
</script>

<nav>
  <h1>Wizard Booth</h1>
  <button class="borderless" on:click={createNew}>New Character</button>
</nav>

<div class="flex-container">
  {#each characters as npc (npc.name)}
    <Character {npc} />
  {/each}
</div>
