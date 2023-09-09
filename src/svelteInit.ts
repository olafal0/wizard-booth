import App from "./App.svelte";

const appEl = document.getElementById("svelte-app");
if (!appEl) {
  throw new Error("Could not find element with id 'svelte-app'");
}
const app = new App({
  target: appEl,
});
