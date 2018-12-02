import input from "./input";

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

run();
