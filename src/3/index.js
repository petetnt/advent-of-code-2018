import input, { format } from "./input";

const testInput = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`
  .split("\n")
  .map(format);

const run = () => {
  const sum = input
    .reduce((acc, { x, y, width, height }) => {
      for (let i = 0; i < width; i++) {
        for (let l = 0; l < height; l++) {
          const xPos = x + i;
          const yPos = y + l;
          if (!acc[xPos]) {
            acc[xPos] = [];
          }

          acc[xPos][yPos] = acc[xPos][yPos] ? acc[xPos][yPos] + 1 : 1;
        }
      }
      return acc;
    }, [])
    .reduce((total, i) => {
      let rowSum = i.reduce((s, x) => {
        s += x > 1 ? 1 : 0;
        return s;
      }, 0);

      total = total + rowSum;
      return total;
    }, 0);

  console.log("Part 3.1", sum);
};

const run2 = () => {};

run();
run2();
