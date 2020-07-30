import { fetchAllStatesMeta } from '../api/api';
import parseMetaData from '../../utils/parseMetaData';
import {
  CLEAR_ALL_STATES_META_ERROR,
  GET_ALL_STATES_META,
  GET_ALL_STATES_META_FAILURE,
  GET_ALL_STATES_META_SUCCESS,
} from '../constants/types';

export const getAllStatesMeta = () => ({
  type: GET_ALL_STATES_META,
});

export const getAllStatesMetaSuccess = (meta) => ({
  type: GET_ALL_STATES_META_SUCCESS,
  meta,
});

export const getAllStatesMetaFailure = (error) => ({
  type: GET_ALL_STATES_META_FAILURE,
  error,
});

export const clearAllStatesMetaError = () => ({
  type: CLEAR_ALL_STATES_META_ERROR,
});

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
