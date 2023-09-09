// Adapted from:
// name_generator.js (https://donjon.bin.sh/code/name/)
// written and released to the public domain by drow <drow@bin.sh>
// http://creativecommons.org/publicdomain/zero/1.0/

export class MarkovChain {
  chain: {
    length: {
      [len: number]: number;
    };
    [from: string]: {
      [to: string]: number;
    };
  };

  constructor(sequences: string[]) {
    this.chain = {
      length: {},
    };

    for (let j = 0; j < sequences.length; j++) {
      var sequence = sequences[j];

      var substr = sequence.slice(1);
      var c = sequence.slice(0, 1);
      var lastC = c;

      // Add the first character to the "initial" special token
      this.increment("initial", c);
      // Add the length to the "length" special token
      this.incrementLength(sequence.length);

      while (substr.length > 0) {
        var c = substr.slice(0, 1);
        this.increment(lastC, c);

        substr = substr.slice(1);
        lastC = c;
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
    if (this.chain.length[len]) {
      this.chain.length[len]++;
    } else {
      this.chain.length[len] = 1;
    }
  }

  normalize() {
    // Normalize all link probabilities so that their total probability ~= 1.0.

    Object.keys(this.chain).forEach((key) => {
      let sum = Object.values(this.chain[key]).reduce(
        (prev, curr) => prev + curr
      );
      Object.keys(this.chain[key]).forEach((token) => {
        this.chain[key][token] = this.chain[key][token] / sum;
      });
    });
  }

  selectLink(from: string): string {
    let idx = Math.random();

    let t = 0;
    for (let token in this.chain[from]) {
      t += this.chain[from][token];
      if (idx < t) {
        return token;
      }
    }
    return "-";
  }

  selectLength(): number {
    let idx = Math.random();

    let t = 0;
    for (let len in this.chain.length) {
      t += this.chain.length[len];
      if (idx < t) {
        return parseInt(len);
      }
    }
    return 0;
  }

  generate() {
    // Pick a length and an initial character
    let length = this.selectLength();
    let c = this.selectLink("initial");
    let lastC = c;
    let tokens = [c];

    for (let i = 1; i < length; i++) {
      c = this.selectLink(lastC);
      tokens.push(c);
      lastC = c;
    }

    return tokens.join("");
  }
}
