import parseDate from './parseDate';

export default function parseData(data) {
  const previous7Days = [];
  const casesReducer = (accumulator, current) => accumulator + current.newCases;
  const deathsReducer = (accumulator, current) =>
    accumulator + current.newDeaths;

  const parsed = data.map((singleDay) => {
    // calculate 7 day average
    let avgCases7Days;
    let avgDeaths7Days;
    previous7Days.push({
      newCases: singleDay.positiveIncrease,
      newDeaths: singleDay.deathIncrease,
    });
    if (previous7Days.length > 7) {
      previous7Days.shift();
      const cumulativeCases = previous7Days.reduce(casesReducer, 0);
      const cumulativeDeaths = previous7Days.reduce(deathsReducer, 0);
      avgCases7Days = Math.ceil(cumulativeCases / 7);
      avgDeaths7Days = Math.ceil(cumulativeDeaths / 7);
    } else {
      avgCases7Days = Math.ceil(
        previous7Days.reduce(casesReducer, 0) / previous7Days.length,
      );
      avgDeaths7Days = Math.ceil(
        previous7Days.reduce(deathsReducer, 0) / previous7Days.length,
      );
    }
    const day = {
      avgCases7Days,
      avgDeaths7Days,
      newCases: singleDay.positiveIncrease,
      newDeaths: singleDay.deathIncrease,
      deaths: singleDay.death,
      totalCases: singleDay.positive,
      date: parseDate(singleDay.date),
      lastUpdated: singleDay.lastModified || singleDay.lastUpdateEt,
      state: singleDay.state,
    };
    return day;
  });
  return parsed;
}
