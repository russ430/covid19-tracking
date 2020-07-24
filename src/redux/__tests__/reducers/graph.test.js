import reducer, { initialState } from '../../reducers/graph';
import {
  setGraphDataToNewCases,
  setGraphDataToNewDeaths,
} from '../../actions/actions';

describe('graph data reducer', () => {
  it('given undefined returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles SET_GRAPH_DATA_TO_NEW_CASES', () => {
    expect(reducer(initialState, setGraphDataToNewCases())).toEqual({
      ...initialState,
      lineKey: 'avgCases7Days',
      barsKey: 'newCases',
      name: 'Cases',
    });
  });

  it('handles SET_GRAPH_DATA_TO_NEW_DEATHS', () => {
    expect(reducer(initialState, setGraphDataToNewDeaths())).toEqual({
      ...initialState,
      lineKey: 'avgDeaths7Days',
      barsKey: 'newDeaths',
      name: 'Deaths',
    });
  });
});
