import {
  fetchResources,
  fetchCurrentStateData,
  fetchAllStatesMeta,
  fetchDailyData,
} from '../../api/api';
import parseMetaData from '../../utils/parseMetaData';
import parseDailyData from '../../utils/parseDailyData';
import parseCurrentData from '../../utils/parseCurrentData';
import * as types from '../constants/types';

export const getAllStatesMeta = () => ({
  type: types.GET_ALL_STATES_META,
});

export const getAllStatesMetaSuccess = (meta) => ({
  type: types.GET_ALL_STATES_META_SUCCESS,
  meta,
});

export const getAllStatesMetaFailure = (error) => ({
  type: types.GET_ALL_STATES_META_FAILURE,
  error,
});

export const selectState = (state) => ({
  type: types.SELECT_STATE,
  selected: state,
});

export const getDailyData = () => ({
  type: types.GET_DAILY_DATA,
});

export const getDailyDataSuccess = (data) => ({
  type: types.GET_DAILY_DATA_SUCCESS,
  lastUpdated: data[data.length - 1].lastUpdated,
  data,
});

export const getDailyDataFailure = (error) => ({
  type: types.GET_DAILY_DATA_FAILURE,
  error,
});

export const getResources = () => ({
  type: types.GET_RESOURCES,
});

export const getResourcesSuccess = (resources) => ({
  type: types.GET_RESOURCES_SUCCESS,
  resources,
});

export const getResourcesFailure = (error) => ({
  type: types.GET_RESOURCES_FAILURE,
  error,
});

export const getCurrentStateData = () => ({
  type: types.GET_CURRENT_STATE_DATA,
});

export const getCurrentStateDataSuccess = (data) => ({
  type: types.GET_CURRENT_STATE_DATA_SUCCESS,
  data,
});

export const getCurrentStateDataFailure = (error) => ({
  type: types.GET_CURRENT_STATE_DATA_FAILURE,
  error,
});

export const setGraphDataToNewDeaths = () => ({
  type: types.SET_GRAPH_DATA_TO_NEW_DEATHS,
});

export const setGraphDataToNewCases = () => ({
  type: types.SET_GRAPH_DATA_TO_NEW_CASES,
});

export const requestCurrentStateData = () => {
  return (dispatch) => {
    dispatch(getCurrentStateData());
    return fetchCurrentStateData().then(
      ({ data }) =>
        dispatch(getCurrentStateDataSuccess(parseCurrentData(data))),
      (error) => dispatch(getCurrentStateDataFailure(error)),
    );
  };
};

export const requestResources = () => {
  return (dispatch) => {
    dispatch(getResources());
    return fetchResources().then(
      ({ items }) => dispatch(getResourcesSuccess(items.slice(0, 20))),
      (error) => dispatch(getResourcesFailure(error)),
    );
  };
};

export const requestAllStatesMeta = () => {
  return (dispatch) => {
    dispatch(getAllStatesMeta());
    return fetchAllStatesMeta()
      .then(({ data }) => {
        const meta = parseMetaData(data);
        dispatch(getAllStatesMetaSuccess(meta));
      })
      .catch((error) => {
        getAllStatesMetaFailure(error);
      });
  };
};

export const requestDailyData = (state) => {
  return (dispatch) => {
    dispatch(getDailyData());
    return fetchDailyData(state)
      .then(({ data }) => {
        // move current dates to end of array
        data.reverse();
        const parsed = parseDailyData(data);
        dispatch(getDailyDataSuccess(parsed));
      })
      .catch((error) => {
        dispatch(getDailyDataFailure(error));
      });
  };
};
