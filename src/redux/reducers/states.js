import * as types from '../constants/types';

export const initialState = {
  data: null,
  meta: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STATE_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
      };
    case types.GET_STATE_DATA_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case types.GET_ALL_STATES_META_SUCCESS:
      return {
        ...state,
        meta: action.meta,
      };
    case types.GET_ALL_STATES_META_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
