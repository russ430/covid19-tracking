import reducer, { initialState } from '../../reducers/states';
import * as actions from '../../actions/actions';

describe('state reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles GET_STATE_DATA_SUCCESS', () => {
    const data = 1;
    expect(
      reducer(
        { ...initialState, isFetchingData: true },
        actions.getStateDataSuccess(data),
      ),
    ).toEqual({
      ...initialState,
      data,
      isFetchingData: false,
    });
  });

  it('handles GET_ALL_STATES_META_SUCCESS', () => {
    const meta = 1;
    expect(
      reducer(initialState, actions.getAllStatesMetaSuccess(meta)),
    ).toEqual({
      ...initialState,
      meta,
    });
  });
});
