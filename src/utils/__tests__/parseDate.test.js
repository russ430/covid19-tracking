import parseDate from '../parseDate';

describe('parseDate function', () => {
  it('given date in format YEARMONTHDAY, returns MONTH-DAY-YEAR', () => {
    expect(parseDate(20200101)).toEqual(new Date('01-01-2020'));
  });
});
