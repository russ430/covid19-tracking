import * as types from '../constants/types';

export const initialState = {
  daily: null,
  current: null,
  currentError: null,
  dailyError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CURRENT_US_DATA_TOTALS:
      return {
        ...state,
        isFetchingCurrent: true,
        currentError: null,
      };
    case types.GET_CURRENT_US_DATA_TOTALS_SUCCESS:
      return {
        ...state,
        current: action.data,
        isFetchingCurrent: false,
      };
    case types.GET_CURRENT_US_DATA_TOTALS_FAILURE:
      return {
        ...state,
        currentError: action.error,
        isFetchingCurrent: false,
      };
    case types.GET_DAILY_US_DATA_TOTALS:
      return {
        ...state,
        isFetchingDaily: true,
        dailyError: null,
      };
    case types.GET_DAILY_US_DATA_TOTALS_SUCCESS:
      return {
        ...state,
        daily: action.data,
        isFetchingDaily: false,
      };
    case types.GET_DAILY_US_DATA_TOTALS_FAILURE:
      return {
        ...state,
        dailyError: action.error,
        isFetchingDaily: false,
      };
    default:
      return state;
  }
};

export default reducer;
