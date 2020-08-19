export const ALL_STATES_CURRENT_DATA =
  'https://api.covidtracking.com/v1/states/current.json';

export const STATE_DAILY_DATA = (state) =>
  `https://api.covidtracking.com/v1/states/${state}/daily.json`;

export const ALL_STATES_META =
  'https://api.covidtracking.com/v1/states/info.json';

export const US_DAILY_DATA = 'https://api.covidtracking.com/v1/us/daily.json';

export const CDC_RESOURCES =
  'https://tools.cdc.gov/api/v2/resources/media/403372.rss';
