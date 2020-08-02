<script>
  import Editable from "./Editable";

  export let npc;

  export let expanded = true;

  function saveChange(event) {
    console.log(`Saving ${event.detail.key} = ${event.detail.content}`);
  }
</script>

<div
  class="card"
  on:click={() => {
    expanded = true;
  }}>
  {#if expanded}
    <div
      class="right small"
      on:click|stopPropagation={() => {
        expanded = false;
      }}>
      Collapse
    </div>
    <h3>{npc.name}</h3>
    <div>
      <Editable on:updated={saveChange} bind:content={npc.appearance} />
    </div>
    <div>
      <Editable on:updated={saveChange} bind:content={npc.lowAbility} />
      but
      <Editable on:updated={saveChange} bind:content={npc.highAbility} />
    </div>
    <div>
      <Editable on:updated={saveChange} bind:content={npc.talent} />
    </div>
    <div>
      <Editable on:updated={saveChange} bind:content={npc.mannerism} />
    </div>
    <div>
      <Editable on:updated={saveChange} bind:content={npc.interactionStyle} />
    </div>
    <div>
      <Editable on:updated={saveChange} bind:content={npc.ideal} />
    </div>
    <div>
      <Editable on:updated={saveChange} bind:content={npc.bond} />
    </div>
    <div>
      <Editable on:updated={saveChange} bind:content={npc.flaw} />
    </div>
    {#if npc.tags}
      <div>
        {#each npc.tags as tag}
          <div class="tag">{tag}</div>
        {/each}
      </div>
    {/if}
    {#if npc.stats}
      <div class="stat-block">
        {#each Object.keys(npc.stats) as stat}
          <div class="stat-item">
            {stat.toUpperCase()}
            <br />
            {npc.stats[stat]}
          </div>
        {/each}
      </div>
    {/if}
  {:else}
    <h3>{npc.name}</h3>
    <div>{npc.appearance}, {npc.highAbility}, {npc.lowAbility}</div>
  {/if}
</div>
