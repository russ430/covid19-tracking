import * as types from '../constants/types';

export const initialState = {
  data: null,
  isFetching: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CURRENT_STATE_DATA:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case types.GET_CURRENT_STATE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.data,
      };
    case types.GET_CURRENT_STATE_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case types.CLEAR_CURRENT_STATE_DATA_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
