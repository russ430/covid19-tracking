import * as types from '../constants/types';

export const initialState = {
  resources: null,
  error: null,
  isFetching: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CDC_RESOURCES:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case types.GET_CDC_RESOURCES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        resources: action.resources,
      };
    case types.GET_CDC_RESOURCES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case types.CLEAR_CDC_RESOURCES_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
