import * as types from '../constants/types';

export const selectState = (state) => ({
  type: types.SELECT_STATE,
  selected: state,
});

export const setGraphDataToNewDeaths = () => ({
  type: types.SET_GRAPH_DATA_TO_NEW_DEATHS,
});

export const setGraphDataToNewCases = () => ({
  type: types.SET_GRAPH_DATA_TO_NEW_CASES,
});
