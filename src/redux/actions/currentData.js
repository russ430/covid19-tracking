import { fetchAllStatesCurrentData } from '../api/api';
import parseCurrentData from '../../utils/parseCurrentData';
import {
  CLEAR_CURRENT_STATE_DATA_ERROR,
  GET_CURRENT_STATE_DATA,
  GET_CURRENT_STATE_DATA_FAILURE,
  GET_CURRENT_STATE_DATA_SUCCESS,
} from '../constants/types';

export const getCurrentStateData = () => ({
  type: GET_CURRENT_STATE_DATA,
});

export const getCurrentStateDataSuccess = (data) => ({
  type: GET_CURRENT_STATE_DATA_SUCCESS,
  data,
});

export const getCurrentStateDataFailure = (error) => ({
  type: GET_CURRENT_STATE_DATA_FAILURE,
  error,
});

export const clearCurrentStateDataError = () => ({
  type: CLEAR_CURRENT_STATE_DATA_ERROR,
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
