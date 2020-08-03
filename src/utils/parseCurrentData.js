export default function parseCurrentData(data) {
  const parsed = data.map((state) => {
    return {
      id: state.hash,
      totalCases: state.positive,
      deaths: state.death,
      tests: state.totalTestResults,
      state: state.state.toLowerCase(),
      newCases: state.positiveIncrease,
      lastUpdated: state.lastUpdateEt,
    };
  });
  return parsed;
}
