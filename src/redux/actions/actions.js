import axios from 'axios';
import RSSParser from 'rss-parser';

import parseMetaData from '../../utils/parseMetaData';
import parseData from '../../utils/parseData';
import * as types from '../constants/types';

const parser = new RSSParser();

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

function fetchTheResources() {
  return parser.parseURL(
    'https://tools.cdc.gov/api/v2/resources/media/403372.rss',
  );
}

export const fetchResources = () => {
  return (dispatch) => {
    dispatch(getResources());
    return fetchTheResources().then(
      ({ items }) => dispatch(getResourcesSuccess(items.slice(0, 20))),
      (error) => dispatch(getResourcesFailure(error)),
    );
  };
};

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
        // move current dates to end of array
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
