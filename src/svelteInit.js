import App from './App.svelte';

// Load regenerator-runtime to allow transpilation of async Svelte functions
require('regenerator-runtime/runtime');

const app = new App({
  target: document.getElementById('svelte-app'),
});
