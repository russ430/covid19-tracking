import reducer, { initialState } from '../../reducers/currentData';
import {
  getCurrentStateData,
  getCurrentStateDataSuccess,
  getCurrentStateDataFailure,
  clearCurrentStateDataError,
} from '../../actions/actions';

describe('currentData reducer', () => {
  it('given undefined returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles GET_CURRENT_STATE_DATA', () => {
    expect(reducer(initialState, getCurrentStateData())).toEqual({
      ...initialState,
      isFetching: true,
      error: null,
    });
  });

  it('handles GET_CURRENT_STATE_DATA_SUCCESS', () => {
    const data = 1;
    expect(
      reducer(
        { ...initialState, isFetching: true },
        getCurrentStateDataSuccess(data),
      ),
    ).toEqual({
      ...initialState,
      isFetching: false,
      data,
    });
  });

  it('handles GET_CURRENT_STATE_DATA_FAILURE', () => {
    const error = 1;
    expect(
      reducer(
        { ...initialState, isFetching: true },
        getCurrentStateDataFailure(error),
      ),
    ).toEqual({
      ...initialState,
      isFetching: false,
      error,
    });
  });

  it('handles CLEAR_CURRENT_STATE_DATA_ERROR', () => {
    const error = 1;
    expect(
      reducer({ ...initialState, error }, clearCurrentStateDataError()),
    ).toEqual({
      ...initialState,
      error: null,
    });
  });
});
