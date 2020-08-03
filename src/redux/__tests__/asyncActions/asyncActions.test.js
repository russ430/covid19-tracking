import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as url from '../../api/constants';
import {
  getAllStatesMeta,
  getAllStatesMetaFailure,
  getAllStatesMetaSuccess,
  getDailyData,
  getDailyDataSuccess,
  getDailyDataFailure,
  getCurrentStateData,
  getCurrentStateDataFailure,
  getCurrentStateDataSuccess,
  requestAllStatesMeta,
  requestCurrentStateData,
  requestStateDailyData,
} from '../../actions';

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('async actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('creates GET_CURRENT_STATE_DATA_SUCCESS when fetching data has been done', () => {
    const date = `${new Date('01-01-2020')}`;
    const data = [
      {
        state: 'MA',
        positive: 1,
        death: 1,
        totalTestResults: 1,
        hash: 1,
        positiveIncrease: 1,
        lastUpdateEt: date,
      },
    ];
    mock.onGet(url.ALL_STATES_CURRENT_DATA).reply(200, data);

    const parsed = [
      {
        id: 1,
        totalCases: 1,
        deaths: 1,
        tests: 1,
        state: 'ma',
        newCases: 1,
        lastUpdated: date,
      },
    ];

    const expectedActions = [
      getCurrentStateData(),
      getCurrentStateDataSuccess(parsed),
    ];
    return store.dispatch(requestCurrentStateData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_CURRENT_STATE_DATA_FAILED when fetching data has failed', () => {
    const error = new Error('Request failed with status code 401');
    mock.onGet(url.ALL_STATES_CURRENT_DATA).reply(401, error);

    const expectedActions = [
      getCurrentStateData(),
      getCurrentStateDataFailure(error),
    ];
    return store.dispatch(requestCurrentStateData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_ALL_STATES_META_SUCCESS when fetching data has succeeded', () => {
    const data = [
      {
        state: 'MA',
        name: 'Massachusetts',
        fips: '01',
        twitter: '@mass',
        covid19Site: 'https://www.covid.com',
      },
    ];
    mock.onGet(url.ALL_STATES_META).reply(200, data);

    const parsed = {
      ma: {
        state: 'ma',
        name: 'Massachusetts',
        id: '01',
        twitterHandle: '@mass',
        covidSite: 'https://www.covid.com',
      },
    };

    const expectedActions = [
      getAllStatesMeta(),
      getAllStatesMetaSuccess(parsed),
    ];
    return store.dispatch(requestAllStatesMeta()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_ALL_STATES_META_FAILURE when fetching data has failed', () => {
    const error = new Error('Request failed with status code 401');
    mock.onGet(url.ALL_STATES_META).reply(401, error);

    const expectedActions = [
      getAllStatesMeta(),
      getAllStatesMetaFailure(error),
    ];
    return store.dispatch(requestAllStatesMeta()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_DAILY_STATE_DATA_SUCCESS when fetching data has succeeded', () => {
    const state = 'ma';
    const date = new Date('01-01-2020').toISOString();
    const data = [
      {
        positiveIncrease: 1,
        death: 1,
        deathIncrease: 1,
        positive: 1,
        date: 20200101,
        lastModified: date,
        state: 'MA',
      },
    ];
    mock.onGet(url.STATE_DAILY_DATA(state)).reply(200, data);

    const parsed = [
      {
        avgCases7Days: 1,
        avgDeaths7Days: 1,
        newCases: 1,
        newDeaths: 1,
        deaths: 1,
        totalCases: 1,
        date: new Date('01-01-2020'),
        lastUpdated: date,
        state: 'MA',
      },
    ];

    const expectedActions = [getDailyData(), getDailyDataSuccess(parsed)];

    return store.dispatch(requestStateDailyData(state)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_DAILY_STATE_DATA_FAILURE when fetching data has failed', () => {
    const error = new Error('Request failed with status code 401');
    const state = 'ma';
    mock.onGet(url.STATE_DAILY_DATA(state)).reply(401, error);

    const expectedActions = [getDailyData(), getDailyDataFailure(error)];

    return store.dispatch(requestStateDailyData(state)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
