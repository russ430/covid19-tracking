import reducer, { initialState } from '../../reducers/selected';
import { selectState } from '../../actions/actions';

describe('selected reducer', () => {
  it('given undefined returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles SELECT_STATE', () => {
    const state = 1;
    expect(reducer(initialState, selectState(state))).toEqual({
      ...initialState,
      selected: state,
    });
  });
});
