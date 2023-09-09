<script lang="ts">
  import Editable from "./Editable.svelte";
  import TagEditor from "./TagEditor.svelte";
  import { createEventDispatcher } from "svelte";
  import type NPC from "./npc.ts";

  const dispatch = createEventDispatcher<{
    delete: NPC;
    dragstart: NPC;
    drop: NPC;
  }>();

  export let npc: NPC;
  export let expanded = false;
  let cardDraggable = true;

  function deleteCharacter() {
    dispatch("delete", npc);
  }

  function dragstart(event: DragEvent) {
    dispatch("dragstart", npc);
  }

  function drop(event: DragEvent) {
    dispatch("drop", npc);
  }

  // Create a proxy object for avoiding all the pitfalls of classes, bindings,
  // and Svelte reactivity
  // Any random() method will call the relevant method on npc and assign it
  // to itself, which will trigger Svelte's reactive updates, and avoid needing
  // to do any bind() trickery.
  const npcProxy = new Proxy(
    {
      randomName: () => {},
      randomAppearance: () => {},
      randomAbilities: () => {},
      randomTalent: () => {},
      randomMannerism: () => {},
      randomInteractionStyle: () => {},
      randomIdeal: () => {},
      randomBond: () => {},
      randomFlaw: () => {},
    },
    {
      get: function (
        target,
        prop:
          | "randomName"
          | "randomAppearance"
          | "randomAbilities"
          | "randomTalent"
          | "randomMannerism"
          | "randomInteractionStyle"
          | "randomIdeal"
          | "randomBond"
          | "randomFlaw"
      ) {
        return () => {
          npc[prop]();
          npc = npc;
        };
      },
    }
  );
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div
  class="card"
  on:click={() => {
    expanded = true;
  }}
  draggable={cardDraggable}
  on:dragstart={dragstart}
  on:dragover|preventDefault={() => {}}
  on:drop={drop}
>
  {#if expanded}
    <div class="left small" on:click|stopPropagation={deleteCharacter}>
      Delete
    </div>
    <div
      class="right small"
      on:click|stopPropagation={() => {
        expanded = false;
      }}
    >
      Collapse
    </div>
    <h3>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomName}
      >
        refresh
      </button>
      <Editable bind:content={npc.name} />
    </h3>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomAppearance}
      >
        refresh
      </button>
      Appearance:
      <Editable bind:content={npc.appearance} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomAbilities}
      >
        refresh
      </button>
      Abilities:
      <Editable bind:content={npc.lowAbility} />
      but
      <Editable bind:content={npc.highAbility} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomTalent}
      >
        refresh
      </button>
      Talent:
      <Editable bind:content={npc.talent} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomMannerism}
      >
        refresh
      </button>
      Mannerism:
      <Editable bind:content={npc.mannerism} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomInteractionStyle}
      >
        refresh
      </button>
      Interaction style:
      <Editable bind:content={npc.interactionStyle} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomIdeal}
      >
        refresh
      </button>
      Ideal:
      <Editable bind:content={npc.ideal} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomBond}
      >
        refresh
      </button>
      Bond:
      <Editable bind:content={npc.bond} />
    </div>
    <div>
      <button
        class="material-icons borderless small"
        on:click={npcProxy.randomFlaw}
      >
        refresh
      </button>
      Flaw:
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
        <textarea
          on:focus={() => {
            cardDraggable = false;
          }}
          on:focusout={() => {
            cardDraggable = true;
          }}
          rows="10"
          cols="40"
          bind:value={npc.notes}
        />
      </form>
    </div>
  {:else}
    <h3>{npc.name}</h3>
    <div>{npc.appearance}, {npc.highAbility}, {npc.lowAbility}</div>
  {/if}
</div>
