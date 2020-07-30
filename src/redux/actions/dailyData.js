import { fetchStateDailyData } from '../api/api';
import parseDailyData from '../../utils/parseDailyData';
import {
  CLEAR_DAILY_DATA_ERROR,
  GET_DAILY_DATA,
  GET_DAILY_DATA_FAILURE,
  GET_DAILY_DATA_SUCCESS,
} from '../constants/types';

export const getDailyData = () => ({
  type: GET_DAILY_DATA,
});

export const getDailyDataSuccess = (data) => ({
  type: GET_DAILY_DATA_SUCCESS,
  lastUpdated: data[data.length - 1].lastUpdated,
  data,
});

export const getDailyDataFailure = (error) => ({
  type: GET_DAILY_DATA_FAILURE,
  error,
});

export const clearDailyDataError = () => ({
  type: CLEAR_DAILY_DATA_ERROR,
});

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
        dispatch(getDailyDataFailure(error));
      });
  };
};
