import {API_OLD_URL} from '@env';

export const combineData = (data, params) => {
  const obj = {};
  for (const property in params) {
    obj[property] = params[property];
  }
  return {...data, ...obj};
};

export const getFromOldUrl = (url) => {
  return `${API_OLD_URL}/${url}`;
};

export const getNumberOfYears = (dt) => {
  let oldDate = new Date(`${dt}/01`);
  let currentDate = new Date();
  currentDate = currentDate.getFullYear() * 12 + currentDate.getMonth();
  oldDate = oldDate.getFullYear() * 12 + oldDate.getMonth();
  let difference = currentDate - oldDate;
  let range;
  if (difference < 12) {
    range = difference > 1 ? 'months' : 'month';
  } else {
    difference = Math.ceil(difference / 12);
    range = difference > 1 ? 'years' : 'year';
  }
  return `${difference} ${range} ago`;
};
