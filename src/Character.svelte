<script>
  export let name;
  export let desc;
  export let bio;
  export let notes;
  export let tags;
  export let stats;

  export let expanded = true;
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
    <h3>{name}</h3>
    <div>{desc}</div>
    <div>{bio}</div>
    <div>{notes}</div>
    <div>
      {#each tags as tag}
        <div class="tag">{tag}</div>
      {/each}
    </div>
    <div class="stat-block">
      {#each Object.keys(stats) as stat}
        <div class="stat-item">
          {stat.toUpperCase()}
          <br />
          {stats[stat]}
        </div>
      {/each}
    </div>
  {:else}
    <h3>{name}</h3>
    <div>{desc}</div>
  {/if}
</div>
