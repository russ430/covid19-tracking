export default function parseDate(d) {
  const date = d.toString();
  const year = date.slice(0, 4);
  const month = date.slice(4, 6);
  const day = date.slice(6);
  return new Date(`${month}-${day}-${year}`);
}
