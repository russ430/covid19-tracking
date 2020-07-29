export default function parseMetaData(data) {
  const meta = {};
  data.forEach((state) => {
    const stateAbbreviation = state.state.toLowerCase();
    if (!meta[stateAbbreviation]) {
      meta[stateAbbreviation] = {
        state: stateAbbreviation,
        name: state.name,
        id: state.fips,
        twitterHandle: state.twitter,
        covidSite: state.covid19Site,
      };
    }
  });
  return meta;
}
