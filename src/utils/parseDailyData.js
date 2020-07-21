import parseDate from './parseDate';

export default function parseData(data) {
  const previous7DaysOfCases = [];
  const sumReducer = (accumulator, current) => accumulator + current;

  const parsed = data.map((singleDay) => {
    // calculate 7 day average
    let avgCases7Days;
    previous7DaysOfCases.push(singleDay.positiveIncrease);
    if (previous7DaysOfCases.length > 7) {
      previous7DaysOfCases.shift();
      const total = previous7DaysOfCases.reduce(sumReducer);
      avgCases7Days = Math.ceil(total / 7);
    } else {
      avgCases7Days = Math.ceil(
        previous7DaysOfCases.reduce(sumReducer) / previous7DaysOfCases.length,
      );
    }
    const day = {
      avgCases7Days,
      newCases: singleDay.positiveIncrease,
      deaths: singleDay.death,
      totalCases: singleDay.positive,
      date: parseDate(singleDay.date),
      lastUpdated: singleDay.lastModified || singleDay.lastUpdateEt,
    };
    return day;
  });
  return parsed;
}
