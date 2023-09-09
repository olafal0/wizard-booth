<script lang="ts">
  import NPC from "./npc";

  export let characters: NPC[];

  export function save() {
    const gameName = "default-game"; // localStorage.getItem("last-saved");
    window.localStorage.setItem(`wb-${gameName}`, JSON.stringify(characters));
  }

  export function load() {
    const gameName = "default-game";
    const data = window.localStorage.getItem("wb-default-game");
    if (!data) {
      return;
    }
    const npcs: NPC[] = JSON.parse(data);
    characters = npcs.map((npc) => NPC.fromJSON(npc));
  }
</script>
