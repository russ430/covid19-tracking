import reducer, { initialState } from '../../reducers/resources';
import * as actions from '../../actions/actions';

describe('resource reducer', () => {
  it('given undefined returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles GET_RESOURCES', () => {
    expect(reducer(initialState, actions.getResources())).toEqual({
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
        actions.getResourcesSuccess(resources),
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
        actions.getResourcesFailure(error),
      ),
    );
  });
});