import { SELECT_STATE } from '../constants/types';

export const initialState = {
  selected: 'all',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_STATE:
      return {
        ...state,
        selected: action.selected,
      };
    default:
      return state;
  }
};

export default reducer;
