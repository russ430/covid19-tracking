import axios from 'axios';

import * as types from '../constants/types';

export const getAllStatesData = () => ({
  type: types.GET_ALL_STATES_DATA,
});

export const getAllStatesDataSuccess = (data) => ({
  type: types.GET_ALL_STATES_DATA_SUCCESS,
  data,
});

export const getAllStatesDataFailure = (error) => ({
  type: types.GET_ALL_STATES_DATA_FAILURE,
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

export const fetchAllStatesMeta = () => {
  return (dispatch) => {
    dispatch(getAllStatesMeta());
    axios
      .get('https://covidtracking.com/api/v1/states/info.json')
      .then(({ data }) => {
        console.log(data);
        const meta = [];
        data.forEach((state) => meta.push(state));
        dispatch(getAllStatesMetaSuccess(meta));
      })
      .catch((error) => {
        getAllStatesMetaFailure(error);
      });
  };
};
