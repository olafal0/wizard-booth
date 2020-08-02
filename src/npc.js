import * as characteristics from './rng/characteristics';
import * as nameSets from './rng/nameSets';
import MarkovChain from './rng/markov';

const defaultOptions = {
  nameGenerationSet: 'fantasy',
  tags: [],
};

function chooseOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default class NPC {
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options };
    this.markov = new MarkovChain(nameSets[this.options.nameGenerationSet]);
    this.tags = options.tags;
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
    };
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
      str: 7 + Math.floor(Math.random() * 6),
      dex: 7 + Math.floor(Math.random() * 6),
      con: 7 + Math.floor(Math.random() * 6),
      int: 7 + Math.floor(Math.random() * 6),
      wis: 7 + Math.floor(Math.random() * 6),
      chr: 7 + Math.floor(Math.random() * 6),
    };
  }
}