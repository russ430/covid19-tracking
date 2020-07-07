import * as types from '../constants/types';

export const initialState = {
  total: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOTAL_US_DATA_SUCCESS:
      return {
        ...state,
        total: action.data,
      };
    case types.GET_TOTAL_US_DATA_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
