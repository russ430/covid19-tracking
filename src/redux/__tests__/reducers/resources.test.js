import reducer, { initialState } from '../../reducers/resources';
import {
  clearCDCResourcesError,
  getCDCResources,
  getCDCResourcesFailure,
  getCDCResourcesSuccess,
} from '../../actions';

describe('resource reducer', () => {
  it('given undefined returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles GET_RESOURCES', () => {
    expect(reducer(initialState, getCDCResources())).toEqual({
      ...initialState,
      isFetching: true,
      error: null,
    });
  });

  it('handles GET_RESOURCES_SUCCESS', () => {
    const resources = 1;
    expect(
      reducer(
        { ...initialState, isFetching: true },
        getCDCResourcesSuccess(resources),
      ),
    ).toEqual({
      ...initialState,
      resources,
      isFetching: false,
    });
  });

  it('handles GET_RESOURCES_FAILURE', () => {
    const error = 1;
    expect(
      reducer(
        { ...initialState, isFetching: true },
        getCDCResourcesFailure(error),
      ),
    );
  });

  it('handles CLEAR_CDC_RESOURCES_ERROR', () => {
    const error = 1;
    expect(
      reducer({ ...initialState, error }, clearCDCResourcesError()),
    ).toEqual({
      ...initialState,
      error: null,
    });
  });
});
