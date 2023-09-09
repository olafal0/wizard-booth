<script lang="ts">
  import NPC from "./npc";
  import CharacterList from "./CharacterList.svelte";
  import FileManager from "./FileManager.svelte";
  import { onMount } from "svelte";

  let characters: NPC[] = [];
  let fileManager: FileManager;

  function saveGame() {
    fileManager.save();
  }

  onMount(() => {
    fileManager.load();
  });
</script>

<FileManager bind:characters bind:this={fileManager} />
<CharacterList bind:characters on:save={saveGame} />
