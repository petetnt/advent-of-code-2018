import input from "./input";

const re = /.+([A-Z]).+([A-Z])/;
const format = f => {
  return f.reduce((acc, i) => {
    const [, dep, key] = re.exec(i);
    acc[dep] = acc[dep] || [];
    acc[key] = acc[key] || [];
    acc[key].push(dep);
    return acc;
  }, {});
};

const findKeys = i =>
  Object.entries(i)
    .filter(([key, val]) => val.length === 0)
    .sort(([a], [b]) => a.localeCompare(b));

const removeKey = (list, key) => {
  const newList = Object.entries(list).reduce((x, [k, deps]) => {
    if (k === key) {
      return x;
    }

    x[k] = deps.filter(i => i !== key);
    return x;
  }, {});

  return newList;
};

const run = () => {
  let i = format(input);

  let final = [];

  while (Object.keys(i).length) {
    const [[firstKey]] = findKeys(i);
    final.push(firstKey);
    i = removeKey(i, firstKey);
  }
  console.log("Part 7.1", final.join(""));
};

const run2 = () => {
  let i = format(input);

  let timer = 0;
  const KEYS_UNDER_WORK = new Set();
  let WORKERS = [];
  const MAX_WORKERS = 5;
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // main loop
  while (Object.keys(i).length) {
    let availableKeys = findKeys(i).filter(
      ([key]) => !KEYS_UNDER_WORK.has(key)
    );

    // assign keys to available workers
    if (WORKERS.length < MAX_WORKERS) {
      for (
        let j = 0;
        WORKERS.length < MAX_WORKERS && j < availableKeys.length;
        j++
      ) {
        const [key] = availableKeys[j];
        KEYS_UNDER_WORK.add(key);
        WORKERS.push({ key, need: 60 + ALPHABET.indexOf(key) + 1, current: 0 });
      }
    }

    // increment workers and remove keys if ready
    WORKERS = WORKERS.reduce((acc, worker) => {
      worker.current = worker.current + 1;
      if (worker.current < worker.need) {
        acc.push(worker);
      } else {
        KEYS_UNDER_WORK.delete(worker.key);
        i = removeKey(i, worker.key);
      }
      return acc;
    }, []);

    timer++;
  }
  console.log("Part 7.2", timer);
};

run();
run2();
