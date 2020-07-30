import { fetchCDCResources } from '../api/api';
import {
  CLEAR_CDC_RESOURCES_ERROR,
  GET_CDC_RESOURCES,
  GET_CDC_RESOURCES_FAILURE,
  GET_CDC_RESOURCES_SUCCESS,
} from '../constants/types';

export const getCDCResources = () => ({
  type: GET_CDC_RESOURCES,
});

export const getCDCResourcesSuccess = (resources) => ({
  type: GET_CDC_RESOURCES_SUCCESS,
  resources,
});

export const getCDCResourcesFailure = (error) => ({
  type: GET_CDC_RESOURCES_FAILURE,
  error,
});

export const clearCDCResourcesError = () => ({
  type: CLEAR_CDC_RESOURCES_ERROR,
});

export const requestCDCResources = () => {
  return (dispatch) => {
    dispatch(getCDCResources());
    return fetchCDCResources().then(
      ({ items }) => dispatch(getCDCResourcesSuccess(items.slice(0, 20))),
      (error) => dispatch(getCDCResourcesFailure(error)),
    );
  };
};
