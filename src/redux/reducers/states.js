import * as types from '../constants/types';

export const initialState = {
  data: null,
  meta: null,
  error: null,
  selected: 'all',
  isFetchingData: false,
  isFetchingMeta: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_STATE_DATA_SUCCESS:
      return {
        ...state,
        data: action.data,
        isFetchingData: false,
      };
    case types.GET_STATE_DATA_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetchingData: false,
      };
    case types.GET_ALL_STATES_META:
      return {
        ...state,
        isFetchingMeta: true,
      };
    case types.GET_ALL_STATES_META_SUCCESS:
      return {
        ...state,
        meta: action.meta,
        isFetchingMeta: false,
      };
    case types.GET_ALL_STATES_META_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetchingMeta: false,
      };
    case types.SELECT_STATE:
      return {
        ...state,
        selected: action.selected,
      };
    default:
      return state;
  }
};

export default reducer;
