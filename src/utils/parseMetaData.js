export default function parseMetaData(data) {
  const meta = {};
  data.forEach((state) => {
    const abbreviation = state.state.toLowerCase();
    if (!meta[abbreviation]) {
      meta[abbreviation] = { ...state, state: abbreviation };
    }
  });
  return meta;
}
