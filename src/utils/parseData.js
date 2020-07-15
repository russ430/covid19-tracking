export default function parseData(data) {
  const casesSum = [];
  const reducer = (accumulator, current) => accumulator + current;
  let avgCases7Days;
  const parsed = data.map((obj) => {
    // calculate 7 day average
    casesSum.push(obj.positiveIncrease);
    if (casesSum.length > 7) {
      casesSum.shift();
      const total = casesSum.reduce(reducer);
      avgCases7Days = (total / 7).toFixed(0);
    } else {
      avgCases7Days = Math.ceil(casesSum.reduce(reducer) / casesSum.length);
    }
    return { ...obj, avgCases7Days };
  });
  return parsed;
}
