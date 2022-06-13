// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.

// Answer 2: Here's a JavaScript implementation of the Durstenfeld shuffle, an optimized version of Fisher-Yates:
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export { shuffle }