import i from "./input";
const input = i.split(" ").map(Number);

const run = () => {
  const RECURSIOOOON = ([elems, sum]) => {
    let [childs, amountOfMetas, ...rest] = elems;

    if (childs) {
      for (let i = 0; i < childs; i++) {
        [rest, sum] = RECURSIOOOON([rest, sum]);
      }
    }

    sum = rest.slice(0, amountOfMetas).reduce((a, b) => a + b, sum);
    return [rest.slice(amountOfMetas, rest.length), sum];
  };

  const [, sum] = RECURSIOOOON([input, 0]);

  console.log("Part 8.1", sum);
};

run();
