import input from "./input";
import groupBy from "lodash.groupby";
import countBy from "lodash.countby";
import dateFns from "date-fns";

const mode = arr =>
  arr
    .sort(
      (a, b) =>
        arr.filter(v => v === a).length - arr.filter(v => v === b).length
    )
    .pop();

const run = () => {
  const byId = groupBy(input, "id");

  let mostSleep = null;
  const guards = [];
  for (let [key, values] of Object.entries(byId)) {
    const k = { id: key, sleepMins: [] };
    for (let i = 0; i < values.length; i++) {
      const value = values[i];

      if (!value.event.includes("falls asleep")) {
        continue;
      }

      const fallsAsleep = value.time;
      const wakesUp = values[i + 1].time;

      const diff = dateFns.differenceInMinutes(wakesUp, fallsAsleep);
      const start = fallsAsleep.getMinutes();

      for (let l = 0; l < diff; l++) {
        k.sleepMins.push((start + l) % 60);
      }
    }
    guards.push(k);
    if (!mostSleep || k.sleepMins.length > mostSleep.sleepMins.length) {
      mostSleep = k;
    }
  }

  console.log(`Part 4.1.`, mostSleep.id * mode(mostSleep.sleepMins));

  const sameMinute = guards.reduce(
    (biggest, i) => {
      const { id, sleepMins } = i;

      const newOne = Object.entries(countBy(sleepMins)).reduce(
        (big, [minute, amount]) => {
          if (amount > big.amount) {
            return { minute, amount };
          }
          return big;
        },
        { minute: "0", amount: 0 }
      );

      if (newOne.amount > biggest.amount) {
        return { id, ...newOne };
      }
      return biggest;
    },
    { id: 0, minute: "0", amount: 0 }
  );

  console.log(`Part 4.2.`, sameMinute.id * sameMinute.minute);
};

run();
