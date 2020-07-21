import { bisector } from 'd3';

const bisect = (data, date) => {
  const bisectDate = bisector((d) => new Date(d.date)).left;
  const i = bisectDate(data, date, 1);
  const a = data[i - 1];
  const b = data[i];
  return date - a.date > b.date - date ? b : a;
};

export default bisect;
