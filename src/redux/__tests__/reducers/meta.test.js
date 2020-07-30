import reducer, { initialState } from '../../reducers/meta';
import {
  clearAllStatesMetaError,
  getAllStatesMetaFailure,
  getAllStatesMetaSuccess,
} from '../../actions';

describe('state reducer', () => {
  it('given undefined returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it('handles GET_ALL_STATES_META_SUCCESS', () => {
    const meta = 1;
    expect(
      reducer(
        { ...initialState, isFetching: true },
        getAllStatesMetaSuccess(meta),
      ),
    ).toEqual({
      ...initialState,
      meta,
      isFetching: false,
    });
  });

  it('handles GET_ALL_STATES_META_FAILURE', () => {
    const error = 1;
    expect(
      reducer(
        { ...initialState, isFetching: true },
        getAllStatesMetaFailure(error),
      ),
    ).toEqual({
      ...initialState,
      error,
      isFetching: false,
    });
  });

  it('handles CLEAR_ALL_STATES_META_ERROR', () => {
    const error = 1;
    expect(
      reducer({ ...initialState, error }, clearAllStatesMetaError()),
    ).toEqual({
      ...initialState,
      error: null,
    });
  });
});
