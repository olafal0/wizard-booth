import * as characteristics from "./rng/characteristics";
import * as nameSets from "./rng/nameSets";
import { MarkovChain } from "./rng/markov";

const defaultOptions = {
  nameGenerationSet: "fantasy",
  tags: [],
};

function chooseOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default class NPC {
  options: {
    nameGenerationSet: string;
    tags: string[];
  };
  tags: string[];
  markov: MarkovChain;
  notes: string;
  name: string;
  appearance: string;
  highAbility: string;
  lowAbility: string;
  talent: string;
  mannerism: string;
  interactionStyle: string;
  ideal: string;
  bond: string;
  flaw: string;
  stats: {
    [name: string]: number;
  };

  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options };
    this.markov = new MarkovChain(nameSets.fantasy.concat(nameSets.romanian));
    this.tags = this.options.tags;
    this.notes = "";
    // Set zero values for all characteristics to appease typescript
    this.name = "";
    this.appearance = "";
    this.highAbility = "";
    this.lowAbility = "";
    this.talent = "";
    this.mannerism = "";
    this.interactionStyle = "";
    this.ideal = "";
    this.bond = "";
    this.flaw = "";
    this.stats = {
      str: 0,
      dex: 0,
      con: 0,
      int: 0,
      wis: 0,
      chr: 0,
    };
    // Generate random characteristics to start with
    this.randomName();
    this.randomAppearance();
    this.randomAbilities();
    this.randomTalent();
    this.randomMannerism();
    this.randomInteractionStyle();
    this.randomIdeal();
    this.randomBond();
    this.randomFlaw();
    this.randomStats();
  }

  static fromJSON(data: { [key: string]: any }) {
    const npc = new NPC();
    npc.name = data.name;
    npc.appearance = data.appearance;
    npc.highAbility = data.highAbility;
    npc.lowAbility = data.lowAbility;
    npc.talent = data.talent;
    npc.mannerism = data.mannerism;
    npc.interactionStyle = data.interactionStyle;
    npc.ideal = data.ideal;
    npc.bond = data.bond;
    npc.flaw = data.flaw;
    npc.tags = data.tags;
    npc.notes = data.notes;
    return npc;
  }

  toJSON() {
    return {
      name: this.name,
      appearance: this.appearance,
      highAbility: this.highAbility,
      lowAbility: this.lowAbility,
      talent: this.talent,
      mannerism: this.mannerism,
      interactionStyle: this.interactionStyle,
      ideal: this.ideal,
      bond: this.bond,
      flaw: this.flaw,
      tags: this.tags,
      notes: this.notes,
    };
  }

  matchesTags(tags: string[]) {
    // Returns true iff this NPC has every tag in the passed set
    const npcTags = new Set(this.tags);
    return tags.every((t) => npcTags.has(t));
  }

  randomName() {
    let firstName = this.markov.generate();
    let lastName = this.markov.generate();
    this.name = `${firstName} ${lastName}`;
  }

  randomAppearance() {
    this.appearance = chooseOne(characteristics.appearance);
  }

  randomAbilities() {
    this.highAbility = chooseOne(characteristics.highAbility);
    this.lowAbility = chooseOne(characteristics.lowAbility);
  }

  randomTalent() {
    this.talent = chooseOne(characteristics.talents);
  }

  randomMannerism() {
    this.mannerism = chooseOne(characteristics.mannerisms);
  }

  randomInteractionStyle() {
    this.interactionStyle = chooseOne(characteristics.interactions);
  }

  randomIdeal() {
    this.ideal = chooseOne([
      ...characteristics.goodIdeals,
      ...characteristics.evilIdeals,
      ...characteristics.lawfulIdeals,
      ...characteristics.chaoticIdeals,
      ...characteristics.neutralIdeals,
      ...characteristics.otherIdeals,
    ]);
  }

  randomBond() {
    this.bond = chooseOne(characteristics.bonds);
  }

  randomFlaw() {
    this.flaw = chooseOne(characteristics.flawsSecrets);
  }

  randomStats() {
    this.stats = {
      str: 7 + Math.floor(Math.random() * 7),
      dex: 7 + Math.floor(Math.random() * 7),
      con: 7 + Math.floor(Math.random() * 7),
      int: 7 + Math.floor(Math.random() * 7),
      wis: 7 + Math.floor(Math.random() * 7),
      chr: 7 + Math.floor(Math.random() * 7),
    };
  }
}
