import reducer, { initialState } from '../../reducers/us';

describe('us data reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
