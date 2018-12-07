import input from "./input";

const arePolar = (a, b) => {
  return a.toLowerCase() === b.toLowerCase() && a.charAt(0) !== b.charAt(0);
};

const run = input => {
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

  return text.length;
};

const run2 = () => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const re = letter => new RegExp(letter, "gi");

  let lowest = Number.MAX_SAFE_INTEGER;

  for (const i of letters) {
    let test = input.replace(re(i), "");
    const num = run(test);

    if (num < lowest) {
      lowest = num;
    }
  }

  return lowest;
};

const one = run(input);
console.log("Part 5.1", one);

const two = run2();
console.log("Part 5.2", two);
