<script>
  import NPC from "./npc";
  import CharacterList from "./CharacterList";
  import FileManager from "./FileManager";
  import { onMount } from "svelte";

  let characters = [];
  let fileManager;

  function saveGame() {
    fileManager.save();
  }

  onMount(() => {
    fileManager.load();
  });
</script>

<FileManager bind:characters bind:this={fileManager} />
<CharacterList bind:characters on:save={saveGame} />
