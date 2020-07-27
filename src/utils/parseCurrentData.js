export default function parseCurrentData(data) {
  const parsed = data.map((state) => {
    return {
      hash: state.hash,
      totalCases: state.positive,
      deaths: state.death,
      tests: state.totalTestResults,
      state: state.state.toLowerCase(),
      caseRate: (state.positive / state.totalTestResults).toFixed(3),
      newCases: state.positiveIncrease,
    };
  });
  return parsed;
}
