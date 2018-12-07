import input from "./input";

const arePolar = (a, b) => {
  return a.toLowerCase() === b.toLowerCase() && a.charAt(0) !== b.charAt(0);
};

const run = () => {
  let completed = false;
  let text = input;
  let loops = 0;
  let a;
  let b;

  while (!completed) {
    let foundPolar = false;
    for (let i = 0; i < text.length - 1; i++) {
      a = text[i];
      b = text[i + 1];

      if (arePolar(a, b)) {
        text = text.slice(0, i) + text.slice(i + 2, text.length);
        i--;
        foundPolar = true;
      }
    }

    if (!foundPolar) {
      completed = true;
    }
  }

  console.log("Part 5.1", text.length);
};

run();
