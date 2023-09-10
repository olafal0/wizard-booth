// Adapted from:
// name_generator.js (https://donjon.bin.sh/code/name/)
// written and released to the public domain by drow <drow@bin.sh>
// http://creativecommons.org/publicdomain/zero/1.0/

export class MarkovChain {
  chain: {
    [from: string]: {
      [to: string]: number;
    };
  };
  lengths: {
    [len: number]: number;
  };

  constructor(sequences: string[]) {
    this.chain = {};
    this.lengths = {};

    for (let j = 0; j < sequences.length; j++) {
      let sequence = sequences[j].toLocaleLowerCase();

      if (sequence.length < 2) {
        console.error("Sequence too short: " + sequence);
        continue;
      }
      let current = sequence.slice(0, 1);
      let remaining = sequence.slice(1);

      // Add the first character to the "initial" special token
      this.increment("initial", current);
      // Add the length to the "length" special token
      this.incrementLength(sequence.length);

      let previous = "";
      while (remaining.length > 1) {
        let next = remaining.slice(1, 2);
        previous = current;
        current = remaining.slice(0, 1);
        this.increment(current, next);
        this.increment(previous + current, next);

        remaining = remaining.slice(1);
      }
      if (remaining.length > 0) {
        let next = remaining.slice(0, 1);
        this.increment(current, next);
        this.increment(previous + current, next);
      }
    }

    this.normalize();
  }

  increment(from: string, to: string) {
    // Increment the probability of "from" leading to "to".
    if (this.chain[from]) {
      if (this.chain[from][to]) {
        this.chain[from][to]++;
      } else {
        this.chain[from][to] = 1;
      }
    } else {
      this.chain[from] = {};
      this.chain[from][to] = 1;
    }
  }

  incrementLength(len: number) {
    if (this.lengths[len]) {
      this.lengths[len]++;
    } else {
      this.lengths[len] = 1;
    }
  }

  normalize() {
    // Normalize all link probabilities so that their total probability ~= 1.0.

    Object.keys(this.chain).forEach((key) => {
      this.chain[key] = this.normalizeBranch(this.chain[key]);
    });
    this.lengths = this.normalizeBranch(this.lengths);
  }

  normalizeBranch(tokens: { [to: string]: number }) {
    let sum = Object.values(tokens).reduce((prev, curr) => prev + curr);
    Object.keys(tokens).forEach((token) => {
      tokens[token] = tokens[token] / sum;
    });
    return tokens;
  }

  selectLink(from: string): string {
    let idx = Math.random();

    let t = 0;
    // Create token set using the links of the total "from"
    let tokens = this.chain[from];
    // If no tokens are found, fall back to single-character prediction
    if (!tokens && from.length > 1) {
      let last = from.slice(-1);
      tokens = this.chain[last];
    }
    for (let token in tokens) {
      t += tokens[token];
      if (idx < t) {
        return token;
      }
    }
    return "-";
  }

  selectLength(): number {
    let idx = Math.random();

    let t = 0;
    for (let len in this.lengths) {
      t += this.lengths[len];
      if (idx < t) {
        return parseInt(len);
      }
    }
    return 0;
  }

  generate() {
    // Pick a length and an initial character
    let length = this.selectLength();
    let current = this.selectLink("initial");
    let previous = "";
    let tokens = [current];

    for (let i = 1; i < length; i++) {
      current = this.selectLink(previous + current);
      tokens.push(current);
      previous = current;
    }

    return tokens.join("");
  }
}
