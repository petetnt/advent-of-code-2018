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

let i = format(input);

const findKeys = i =>
  Object.entries(i)
    .filter(([key, val]) => val.length === 0)
    .sort(([a], [b]) => a.localeCompare(b));

const final = [];

while (Object.keys(i).length) {
  const [[firstKey]] = findKeys(i);

  const removeKey = (list, key) => {
    const newList = Object.entries(list).reduce((x, [k, deps]) => {
      if (k === key) {
        final.push(k);
        return x;
      }

      x[k] = deps.filter(i => i !== key);
      return x;
    }, {});

    return newList;
  };

  i = removeKey(i, firstKey);
}

console.log("Part 7.1", final.join(""));
