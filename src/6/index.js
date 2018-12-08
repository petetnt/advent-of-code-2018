import test, { format } from "./input";
import vor from "voronoi-diagram";

const findWidthHeight = test => {
  return test.reduce(
    (acc, [x, y]) => {
      if (x > acc[0]) {
        acc[0] = x;
      }

      if (y > acc[1]) {
        acc[1] = y;
      }

      return acc;
    },
    [0, 0]
  );
};

const createGrid = (width, height) => {
  const array = [];

  for (let i = 0; i <= width; i++) {
    array[i] = [];
    for (let j = 0; j <= height; j++) {
      array[i][j] = new Map();
    }
  }

  return array;
};

const debug = grid => grid.map(i => console.log(i));

let distance = (x, y, i, j) => {
  return Math.abs(x - i) + Math.abs(y - j);
};

const populatedGrid = test => {
  const grid = createGrid(...findWidthHeight(test));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const point = [i, j];
      for (const site of test) {
        const [x, y, letter] = site;
        const d = distance(x, y, ...point);
        grid[i][j].set(letter, d);
      }
    }
  }
  return grid;
};

const run = () => {
  const grid = populatedGrid(test);

  // calculate closest coordinats
  // props to @fhinkel for the Map-trick https://github.com/fhinkel/AdventOfCode2018/commit/251fd6091765c1c31519aad08b1b3dd36a04b652#diff-de5c572307e014f2bed7bc056133e230
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const b = grid[i][j];
      const distances = [...b.values()];
      distances.sort((a, b) => a - b);

      if (distances[0] === distances[1]) {
        grid[i][j] = ".";
      } else {
        const index = [...b.values()].indexOf(distances[0]);
        grid[i][j] = [...b.keys()][index];
      }
    }
  }

  const nonInfite = vor(test.map(([x, y]) => [x, y])).cells.reduce(
    (acc, i, idx) => {
      if (i.every(x => x !== -1)) {
        acc[test[idx][2]] = 0;
      }
      return acc;
    },
    {}
  );

  const counts = grid.reduce((acc, row) => {
    row.forEach(block => {
      if (typeof acc[block] !== "undefined") {
        acc[block]++;
      }
    });

    return acc;
  }, nonInfite);

  const nums = Object.values(counts);
  console.log("Part 6.1.", Math.max(...nums));
};

const run2 = () => {
  const MAX_SIZE = 10000;
  const grid = populatedGrid(test);
  let regions = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const sum = [...grid[i][j].values()].reduce((acc, i) => acc + i, 0);

      if (sum < MAX_SIZE) {
        regions++;
      }
    }
  }

  console.log("Part 6.2", regions);
};

run();
run2();
