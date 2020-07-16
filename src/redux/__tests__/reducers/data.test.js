import reducer, { initialState } from '../../reducers/data';

import * as actions from '../../actions/actions';

describe('data reducer', () => {
  it('given undefined returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles GET_DAILY_DATA', () => {
    expect(reducer(initialState, actions.getDailyData())).toEqual({
      ...initialState,
      isFetching: true,
      error: null,
    });
  });

  it('handles GET_DAILY_DATA_SUCCESS', () => {
    const data = 1;
    expect(
      reducer(
        { ...initialState, isFetching: true },
        actions.getDailyDataSuccess(data),
      ),
    ).toEqual({
      ...initialState,
      data,
      isFetching: false,
      error: null,
    });
  });

  it('handles GET_DAILY_DATA_FAILURE', () => {
    const error = 1;
    expect(
      reducer(
        { ...initialState, isFetching: true },
        actions.getDailyDataFailure(error),
      ),
    ).toEqual({
      ...initialState,
      error,
      isFetching: false,
    });
  });
});