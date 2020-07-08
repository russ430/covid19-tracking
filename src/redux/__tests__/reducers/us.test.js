import reducer, { initialState } from '../../reducers/us';

import * as actions from '../../actions/actions';

describe('us data reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles GET_DAILY_US_DATA_TOTALS_SUCCESS', () => {
    const data = 1;
    expect(
      reducer(
        { ...initialState, isFetchingDaily: true },
        actions.getDailyUSDataTotalsSuccess(data),
      ),
    ).toEqual({
      ...initialState,
      daily: data,
      isFetchingDaily: false,
    });
  });

  it('handles GET_DAILY_US_DATA_TOTALS_FAILURE', () => {
    const error = 1;
    expect(
      reducer(
        { ...initialState, isFetchingDaily: true },
        actions.getDailyUSDataTotalsFailure(error),
      ),
    ).toEqual({
      ...initialState,
      dailyError: error,
      isFetchingDaily: false,
    });
  });

  it('handles GET_CURRENT_US_DATA_TOTALS_SUCCESS', () => {
    const data = 1;
    expect(
      reducer(
        { ...initialState, isFetchingCurrent: true },
        actions.getCurrentUSDataTotalsSuccess(data),
      ),
    ).toEqual({
      ...initialState,
      current: data,
      isFetchingCurrent: false,
    });
  });

  it('handles GET_CURRENT_US_DATA_TOTALS_FAILURE', () => {
    const error = 1;
    expect(
      reducer(
        { ...initialState, isFetchingCurrent: true },
        actions.getCurrentUSDataTotalsFailure(error),
      ),
    ).toEqual({
      ...initialState,
      currentError: error,
      isFetchingCurrent: false,
    });
  });
});
