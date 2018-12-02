import input from "./input";

const list = input.split("\n");

// Part 1

console.log("Part 1", list.reduce((sum, i) => sum + parseInt(i, 10), 0));

// Part 2

const freqs = new Set();
for (let i = 0, sum = 0; true; i++) {
  sum = sum + parseInt(list[i % list.length], 10);
  if (freqs.has(sum)) {
    console.log("Part 2", sum);
    break;
  }
  freqs.add(sum);
}
