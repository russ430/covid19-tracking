export default function parseMetaData(data) {
  const meta = data.map((state) => {
    return {
      state: state.state.toLowerCase(),
      name: state.name,
      id: state.fips,
      covid19Site: state.covid19Site,
      covid19SiteSecondary: state.covid19SiteSecondary,
      covid19SiteTertiary: state.covid19SiteTertiary,
      twitterHandle: state.twitter,
      notes: state.notes,
    };
  });
  meta.sort((a, b) => (a.name > b.name ? 1 : -1));
  return meta;
}
