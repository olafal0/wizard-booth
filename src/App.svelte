<script>
  import Character from "./Character";

  const charData = [
    {
      name: "Olgar Hoarbreath",
      desc: "Some annoying guy",
      bio: "Some dude who follows the party around, just being annoying",
      notes: "met the party in Briarwood",
      tags: ["Briarwood", "important", "magical"],
      stats: {
        str: 10,
        dex: 10,
        con: 10,
        int: 10,
        wis: 10,
        chr: 10
      }
    },
    {
      name: "Stumps Redwood",
      desc: "Super nice but simple dude",
      bio:
        "Woodcutter who seems to know a lot of people around here. Not super smart, though.",
      notes: "actually the BBEG",
      tags: ["BBEG", "enemy", "stupid"],
      stats: {
        str: 18,
        dex: 16,
        con: 15,
        int: 19,
        wis: 8,
        chr: 9
      }
    }
  ];

  const manyChars = [...charData, ...charData, ...charData, ...charData];
</script>

<nav>
  <h1>Wizard Booth</h1>
</nav>

<div class="flex-container">
  <!-- {#each manyChars as character (character.name)} -->
  {#each manyChars as character}
    <Character {...character} />
  {/each}
</div>
