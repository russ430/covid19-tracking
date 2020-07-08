import axios from 'axios';

import parseMetaData from '../../utils/parseMetaData';
import * as types from '../constants/types';

export const getCurrentUSDataTotals = () => ({
  type: types.GET_CURRENT_US_DATA_TOTALS,
});

export const getCurrentUSDataTotalsSuccess = (data) => ({
  type: types.GET_CURRENT_US_DATA_TOTALS_SUCCESS,
  data,
});

export const getCurrentUSDataTotalsFailure = (error) => ({
  type: types.GET_CURRENT_US_DATA_TOTALS_FAILURE,
  error,
});

export const getDailyUSDataTotalsSuccess = (data) => ({
  type: types.GET_DAILY_US_DATA_TOTALS_SUCCESS,
  data,
});

export const getDailyUSDataTotalsFailure = (error) => ({
  type: types.GET_DAILY_US_DATA_TOTALS_FAILURE,
  error,
});

export const getStateData = () => ({
  type: types.GET_STATE_DATA,
});

export const getStateDataSuccess = (data) => ({
  type: types.GET_STATE_DATA_SUCCESS,
  data,
});

export const getStateDataFailure = (error) => ({
  type: types.GET_STATE_DATA_FAILURE,
  error,
});

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

export const fetchAllStatesMeta = () => {
  return (dispatch) => {
    dispatch(getAllStatesMeta());
    axios
      .get('https://covidtracking.com/api/v1/states/info.json')
      .then(({ data }) => {
        const meta = parseMetaData(data);
        dispatch(getAllStatesMetaSuccess(meta));
      })
      .catch((error) => {
        getAllStatesMetaFailure(error);
      });
  };
};

export const fetchCurrentUSDataTotals = () => {
  return (dispatch) => {
    axios
      .get('https://covidtracking.com/api/v1/us/current.json')
      .then(({ data }) => {
        dispatch(getCurrentUSDataTotalsSuccess(data[0]));
      })
      .catch((error) => {
        dispatch(getCurrentUSDataTotalsFailure(error));
      });
  };
};

export const fetchDailyUSDataTotals = () => {
  return (dispatch) => {
    axios
      .get('https://covidtracking.com/api/v1/us/daily.json')
      .then(({ data }) => {
        dispatch(getDailyUSDataTotalsSuccess(data));
      })
      .catch((error) => {
        dispatch(getDailyUSDataTotalsFailure(error));
      });
  };
};

export const fetchDailyStateData = (state) => {
  return (dispatch) => {
    axios
      .get(`https://covidtracking.com/api/v1/states/${state}/daily.json`)
      .then(({ data }) => {
        dispatch(getStateDataSuccess(data));
      })
      .catch((error) => dispatch(getStateDataFailure(error)));
  };
};
