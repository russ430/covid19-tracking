import parseMetaData from '../parseMetaData';

describe('parseMetaData function', () => {
  it('returns expected data object with state abbreviations as keys', () => {
    const data = [
      { state: 'AL', data: 1 },
      { state: 'AB', data: 2 },
    ];
    const expectedObject = {
      al: { state: 'al', data: 1 },
      ab: { state: 'ab', data: 2 },
    };
    expect(parseMetaData(data)).toEqual(expectedObject);
  });
});
