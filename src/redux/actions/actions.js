import axios from 'axios';

import parseMetaData from '../../utils/parseMetaData';
import parseData from '../../utils/parseData';
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
})

export const getDailyDataSuccess = (data) => ({
  type: types.GET_DAILY_DATA_SUCCESS,
  data,
});

export const getDailyDataFailure = (error) => ({
  type: types.GET_DAILY_DATA_FAILURE,
  error,
});

export const setLastUpdated = (time) => ({
  type: types.SET_LAST_UPDATED,
  time,
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

export const fetchDailyData = (state) => {
  let url;
  if (state === 'all') {
    url = 'https://covidtracking.com/api/v1/us/daily.json';
  } else {
    url = `https://covidtracking.com/api/v1/states/${state}/daily.json`;
  }
  return (dispatch) => {
    dispatch(getDailyData());
    axios
      .get(url)
      .then(({ data }) => {
        // move first dates to beginning of array
        data.reverse();
        const parsed = parseData(data);
        dispatch(getDailyDataSuccess(parsed));
        dispatch(setLastUpdated(parsed[parsed.length - 1].lastUpdated));
      })
      .catch((error) => {
        dispatch(getDailyDataFailure(error));
      });
  };
};
