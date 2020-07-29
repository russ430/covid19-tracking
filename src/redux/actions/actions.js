import {
  fetchCDCResources,
  fetchAllStatesCurrentData,
  fetchAllStatesMeta,
  fetchStateDailyData,
} from '../api/api';
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

export const getCDCResources = () => ({
  type: types.GET_CDC_RESOURCES,
});

export const getCDCResourcesSuccess = (resources) => ({
  type: types.GET_CDC_RESOURCES_SUCCESS,
  resources,
});

export const getCDCResourcesFailure = (error) => ({
  type: types.GET_CDC_RESOURCES_FAILURE,
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

export const clearCurrentStateDataError = () => ({
  type: types.CLEAR_CURRENT_STATE_DATA_ERROR,
});

export const clearDailyDataError = () => ({
  type: types.CLEAR_DAILY_DATA_ERROR,
});

export const clearCDCResourcesError = () => ({
  type: types.CLEAR_CDC_RESOURCES_ERROR,
});

export const clearAllStatesMetaError = () => ({
  type: types.CLEAR_ALL_STATES_META_ERROR,
});

export const requestCurrentStateData = () => {
  return (dispatch) => {
    dispatch(getCurrentStateData());
    return fetchAllStatesCurrentData().then(
      ({ data }) =>
        dispatch(getCurrentStateDataSuccess(parseCurrentData(data))),
      (error) => dispatch(getCurrentStateDataFailure(error)),
    );
  };
};

export const requestCDCResources = () => {
  return (dispatch) => {
    dispatch(getCDCResources());
    return fetchCDCResources().then(
      ({ items }) => dispatch(getCDCResourcesSuccess(items.slice(0, 20))),
      (error) => dispatch(getCDCResourcesFailure(error)),
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
        dispatch(getAllStatesMetaFailure(error));
      });
  };
};

export const requestStateDailyData = (state) => {
  return (dispatch) => {
    dispatch(getDailyData());
    return fetchStateDailyData(state)
      .then(({ data }) => {
        // move current dates to end of array
        data.reverse();
        const parsed = parseDailyData(data);
        dispatch(getDailyDataSuccess(parsed));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getDailyDataFailure(error));
      });
  };
};
