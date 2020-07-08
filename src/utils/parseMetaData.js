export default function parseMetaData(data) {
  const meta = {};
  data.forEach((state) => {
    const abbreviation = state.state.toLowerCase();
    if (!meta[abbreviation]) {
      meta[abbreviation] = { ...state };
      meta[abbreviation].state = abbreviation;
    }
  });
  return meta;
}
