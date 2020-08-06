<script>
  import NPC from "./npc";
  import CharacterList from "./CharacterList";
  import { onMount } from "svelte";
  import { remote } from "electron";
  const fs = require("fs");

  export let characters;

  export function save() {
    const filePath = localStorage.getItem("last-saved");
    if (!filePath) {
      saveAs();
      return;
    }
    fs.writeFileSync(filePath, JSON.stringify(characters), {
      encoding: "utf-8"
    });
  }

  export function saveAs() {
    var options = {
      title: "Save file",
      defaultPath: "wizardbooth.json",
      buttonLabel: "Save",
      filters: [{ name: "json", extensions: ["json"] }]
    };

    remote.dialog.showSaveDialog(options).then(({ canceled, filePath }) => {
      if (canceled) {
        return;
      }
      fs.writeFileSync(filePath, JSON.stringify(characters), {
        encoding: "utf-8"
      });
      localStorage.setItem("last-saved", filePath);
    });
  }

  export function load() {
    var options = {
      title: "Open file",
      buttonLabel: "Open",
      filters: [{ name: "json", extensions: ["json"] }]
    };

    remote.dialog.showOpenDialog(options).then(({ canceled, filePaths }) => {
      if (canceled || filePaths.length !== 1) {
        return;
      }
      loadFile(filePaths[0]);
    });
  }

  export function loadFile(filePath) {
    const data = fs.readFileSync(filePath, {
      encoding: "utf-8"
    });
    const npcs = JSON.parse(data);
    characters = npcs.map(npc => NPC.fromJSON(npc));
  }

  onMount(() => {
    const filePath = localStorage.getItem("last-saved");
    console.log(filePath);
    if (filePath) {
      loadFile(filePath);
    }
  });
</script>
