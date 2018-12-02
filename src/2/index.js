import input from "./input";
import fl from "fast-levenshtein";

const run = () => {
  // part 1

  const sort = str =>
    str
      .split("")
      .sort()
      .join("");

  const consecutiveLetters = str => str.match(/(.)\1*/g);
  const findByLength = length => letters =>
    letters.find(i => i.length === length);
  const hasPairs = findByLength(2);
  const hasTripplets = findByLength(3);
  const [a, b] = input.reduce(
    (acc, i) => {
      const letters = consecutiveLetters(sort(i));

      if (hasPairs(letters)) {
        acc[0] = acc[0] + 1;
      }

      if (hasTripplets(letters)) {
        acc[1] = acc[1] + 1;
      }

      return acc;
    },
    [0, 0]
  );

  console.log("Part 2.1", a * b);
};

const run2 = () => {
  const pairwise = list => {
    if (list.length < 2) {
      return [];
    }
    const first = list[0];
    const rest = list.slice(1);
    const pairs = rest.map(x => [first, x]);
    return pairs.concat(pairwise(rest));
  };

  const pairs = pairwise(input);
  const match = pairs.find(([a, b]) => fl.get(a, b) === 1);

  const commonLetters = [];

  for (let i = 0; i < match[0].length; i++) {
    if (match[0][i] === match[1][i]) {
      commonLetters.push(match[0][i]);
    }
  }

  console.log(match);
  console.log("Part 2.2", commonLetters.join(""));
};

run();
run2();
