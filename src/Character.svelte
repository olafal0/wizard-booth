<script>
  import Editable from "./Editable";
  import TagEditor from "./TagEditor";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let npc;

  export let expanded = false;

  function deleteCharacter() {
    dispatch("delete", npc);
  }

  // Create a proxy object for avoiding all the pitfalls of classes, bindings,
  // and Svelte reactivity
  // Any random() method will call the relevant method on npc and assign it
  // to itself, which will trigger Svelte's reactive updates, and avoid needing
  // to do any bind() trickery.
  const npcProxy = new Proxy(
    {},
    {
      get: function(target, prop) {
        return () => {
          npc[prop]();
          npc = npc;
        };
      }
    }
  );
</script>

<div
  class="card"
  on:click={() => {
    expanded = true;
  }}>
  {#if expanded}
    <div class="left small" on:click|stopPropagation={deleteCharacter}>
      Delete
    </div>
    <div
      class="right small"
      on:click|stopPropagation={() => {
        expanded = false;
      }}>
      Collapse
    </div>
    <h3>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomName}>
        refresh
      </button>
      <Editable bind:content={npc.name} />
    </h3>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomAppearance}>
        refresh
      </button>
      <Editable bind:content={npc.appearance} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomAbilities}>
        refresh
      </button>
      <Editable bind:content={npc.lowAbility} />
      but
      <Editable bind:content={npc.highAbility} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomTalent}>
        refresh
      </button>
      <Editable bind:content={npc.talent} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomMannerism}>
        refresh
      </button>
      <Editable bind:content={npc.mannerism} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomInteractionStyle}>
        refresh
      </button>
      <Editable bind:content={npc.interactionStyle} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomIdeal}>
        refresh
      </button>
      <Editable bind:content={npc.ideal} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomBond}>
        refresh
      </button>
      <Editable bind:content={npc.bond} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomFlaw}>
        refresh
      </button>
      <Editable bind:content={npc.flaw} />
    </div>
    <div>
      Tags:
      <TagEditor bind:tags={npc.tags} on:newTag on:removeTag />
    </div>
    {#if npc.stats}
      <div class="stat-block">
        {#each Object.keys(npc.stats) as stat}
          <div class="stat-item">
            {stat.toUpperCase()}
            <br />
            <Editable inputType="number" bind:content={npc.stats[stat]} />
            <!-- {npc.stats[stat]} -->
          </div>
        {/each}
      </div>
    {/if}
    <div>
      Notes:
      <form>
        <textarea rows="10" cols="40" bind:value={npc.notes} />
      </form>
    </div>
  {:else}
    <h3>{npc.name}</h3>
    <div>{npc.appearance}, {npc.highAbility}, {npc.lowAbility}</div>
  {/if}
</div>
