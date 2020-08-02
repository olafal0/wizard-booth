<script>
  import Character from "./Character";
  import NPC from "./npc";
  import { onMount } from "svelte";

  let charData = [];

  onMount(() => {
    charData = new Array(10).fill().map(() => new NPC());
  });
</script>

<nav>
  <h1>Wizard Booth</h1>
</nav>

<div class="flex-container">
  {#each charData as npc (npc.name)}
    <Character {npc} />
  {/each}
</div>
