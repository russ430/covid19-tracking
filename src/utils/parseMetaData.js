/* eslint-disable no-param-reassign */
export default function parseMetaData(data) {
  const meta = data.filter((state) => state.name !== 'American Samoa');
  meta.forEach((state) => {
    state.state = state.state.toLowerCase();
  });
  meta.sort((a, b) => (a.name > b.name ? 1 : -1));
  return meta;
}
