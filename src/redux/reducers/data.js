import * as types from '../constants/types';

export const initialState = {
  data: null,
  error: null,
  isFetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DAILY_DATA:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case types.GET_DAILY_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetching: false,
        error: null,
      };
    case types.GET_DAILY_DATA_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default reducer;
