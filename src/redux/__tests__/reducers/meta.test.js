import reducer, { initialState } from '../../reducers/meta';
import * as actions from '../../actions/actions';

describe('state reducer', () => {
  it('given undefined returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles GET_ALL_STATES_META_SUCCESS', () => {
    const meta = 1;
    expect(
      reducer(initialState, actions.getAllStatesMetaSuccess(meta)),
    ).toEqual({
      ...initialState,
      meta,
      isFetching: false,
    });
  });
});
