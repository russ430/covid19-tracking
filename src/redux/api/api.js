import axios from 'axios';
import RSSParser from 'rss-parser';

import * as url from './constants';

export function fetchAllStatesCurrentData() {
  return axios.get(url.ALL_STATES_CURRENT_DATA);
}

export function fetchCDCResources() {
  const parser = new RSSParser();
  return parser.parseURL(url.CDC_RESOURCES);
}

export function fetchAllStatesMeta() {
  return axios.get(url.ALL_STATES_META);
}

export function fetchStateDailyData(state) {
  let link;
  if (state === 'all') {
    link = url.US_DAILY_DATA;
  } else {
    link = url.STATE_DAILY_DATA(state);
  }
  return axios.get(link);
}
