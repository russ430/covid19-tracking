import axios from 'axios';
import RSSParser from 'rss-parser';

import * as url from './constants';

export function fetchCurrentStateData() {
  return axios.get(url.STATES_CURRENT_DATA);
}

export function fetchResources() {
  const parser = new RSSParser();
  return parser.parseURL(url.CDC_RESOURCES);
}

export function fetchAllStatesMeta() {
  return axios.get(url.STATES_META);
}

export function fetchDailyData(state) {
  let link;
  if (state === 'all') {
    link = url.US_DAILY_DATA;
  } else {
    link = url.STATES_DAILY_DATA(state);
  }
  return axios.get(link);
}
