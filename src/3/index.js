import input, { format } from "./input";

const run = () => {
  const fabric = input.reduce((acc, { x, y, width, height }) => {
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
  }, []);

  const sum = fabric.reduce((total, i) => {
    let rowSum = i.reduce((s, x) => {
      s += x > 1 ? 1 : 0;
      return s;
    }, 0);

    total = total + rowSum;
    return total;
  }, 0);

  console.log("Part 3.1", sum);

  // part 2

  const cleanSlate = input.find(({ x, y, height, width }) => {
    let isClean = true;
    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        if (fabric[i][j] > 1) {
          isClean = false;
          break;
        }
      }
    }

    return isClean;
  });

  console.log("Part 3.2", cleanSlate.id);
};

run();
