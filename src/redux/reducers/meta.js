import * as types from '../constants/types';

export const initialState = {
  meta: null,
  error: null,
  isFetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_STATES_META:
      return {
        ...state,
        isFetching: true,
      };
    case types.GET_ALL_STATES_META_SUCCESS:
      return {
        ...state,
        meta: action.meta,
        isFetching: false,
      };
    case types.GET_ALL_STATES_META_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    case types.CLEAR_ALL_STATES_META_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
