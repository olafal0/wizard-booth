<script>
  import NPC from "./npc";
  import CharacterList from "./CharacterList";
  import FileManager from "./FileManager";
  import { onMount } from "svelte";
  import { remote } from "electron";
  const fs = require("fs");

  let browserWindow;
  let characters = [];
  let fileManager;

  onMount(() => {
    browserWindow = remote.BrowserWindow.getFocusedWindow();
    remote.Menu.setApplicationMenu(
      remote.Menu.buildFromTemplate([
        {
          label: "File",
          submenu: [
            {
              label: "Save",
              accelerator: "CmdOrCtrl+S",
              click() {
                fileManager.save();
              }
            },
            {
              label: "Save as...",
              accelerator: "CmdOrCtrl+Shift+S",
              click() {
                fileManager.saveAs();
              }
            },
            {
              label: "Open",
              accelerator: "CmdOrCtrl+O",
              click() {
                fileManager.load();
              }
            },
            {
              label: "Open Dev Tools",
              accelerator: "CmdOrCtrl+Shift+I",
              click() {
                browserWindow.webContents.toggleDevTools();
              }
            },
            {
              label: "Refresh",
              accelerator: "CmdOrCtrl+R",
              click() {
                browserWindow.webContents.reload();
              }
            }
          ]
        }
      ])
    );
  });
</script>

<FileManager bind:characters bind:this={fileManager} />
<CharacterList bind:characters />
