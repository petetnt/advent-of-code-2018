import input from "./input";
import groupBy from "lodash.groupby";
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
    if (!mostSleep || k.sleepMins.length > mostSleep.sleepMins.length) {
      mostSleep = k;
    }
  }

  console.log(`Part 4.1.`, mostSleep.id * mode(mostSleep.sleepMins));
};

run();
