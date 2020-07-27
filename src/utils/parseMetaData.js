export default function parseMetaData(data) {
  const meta = {};
  data.forEach((state) => {
    const stateAbbreviation = state.state.toLowerCase();
    if (!meta[stateAbbreviation]) {
      meta[stateAbbreviation] = {
        state: stateAbbreviation,
        name: state.name,
        id: state.fips,
        covid19Site: state.covid19Site,
        covid19SiteSecondary: state.covid19SiteSecondary,
        covid19SiteTertiary: state.covid19SiteTertiary,
        twitterHandle: state.twitter,
        notes: state.notes,
      };
    }
  });
  return meta;
}
