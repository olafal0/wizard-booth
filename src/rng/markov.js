// Adapted from:
// name_generator.js (https://donjon.bin.sh/code/name/)
// written and released to the public domain by drow <drow@bin.sh>
// http://creativecommons.org/publicdomain/zero/1.0/

class MarkovChain {
  constructor(sequences, splitBy = null) {
    this.chain = {};
    this.splitBy = splitBy;

    for (let j = 0; j < sequences.length; j++) {
      var sequence = this.tokenize(sequences[j]);

      var substr = sequence.slice(1);
      var c = sequence.slice(0, 1);
      var lastC = c;

      // Add the first character to the "initial" special token
      this.increment('initial', c);
      // Add the length to the "length" special token
      this.increment('length', sequence.length);

      while (substr.length > 0) {
        var c = substr.slice(0, 1);
        this.increment(lastC, c);

        substr = substr.slice(1);
        lastC = c;
      }
    }

    this.normalize();
  }

  tokenize(sequence) {
    // Split a sequence into a list of tokens.
    if (this.splitBy !== null) {
      // If this.splitBy is set, tokens will be substrings split using splitBy
      return sequence.split(this.splitBy);
    }
    // If not, tokens will be individual characters
    return sequence;
  }

  increment(from, to) {
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

  selectLink(from) {
    let idx = Math.random();

    let t = 0;
    for (let token in this.chain[from]) {
      t += this.chain[from][token];
      if (idx < t) {
        return token;
      }
    }
    return '-';
  }

  generate() {
    // Pick a length and an initial character
    let length = this.selectLink('length');
    let c = this.selectLink('initial');
    let lastC = c;
    let tokens = [c];

    for (let i = 1; i < length; i++) {
      c = this.selectLink(lastC);
      tokens.push(c);
      lastC = c;
    }

    if (this.splitBy !== null) {
      return tokens.join(this.splitBy);
    }
    return tokens.join('');
  }
}

module.exports = MarkovChain;
