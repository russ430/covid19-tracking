import {
  SET_GRAPH_DATA_TO_NEW_CASES,
  SET_GRAPH_DATA_TO_NEW_DEATHS,
} from '../constants/types';

export const initialState = {
  lineKey: 'avgCases7Days',
  barsKey: 'newCases',
  name: 'Cases',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GRAPH_DATA_TO_NEW_CASES:
      return {
        ...state,
        lineKey: 'avgCases7Days',
        barsKey: 'newCases',
        name: 'Cases',
      };
    case SET_GRAPH_DATA_TO_NEW_DEATHS:
      return {
        ...state,
        lineKey: 'avgDeaths7Days',
        barsKey: 'newDeaths',
        name: 'Deaths',
      };
    default:
      return state;
  }
};

export default reducer;
