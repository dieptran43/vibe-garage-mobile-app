import {API_OLD_URL} from '@env';
import auth from '@react-native-firebase/auth';

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
  let range, value;
  if (difference < 1) {
    value = 'Less than 1 month ago';
  } else {
    if (difference < 12) {
      range = difference > 1 ? 'months' : 'month';
    } else {
      difference = Math.ceil(difference / 12);
      range = difference > 1 ? 'years' : 'year';
    }
    value = `${difference} ${range} ago`;
  }
  return value;
};

export const generateTransactionReference = () => {
  return new Date()?.getTime();
};

export const signOutOfFacebook = async () => {
  auth()?.signOut();
};

export function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      timeout = null;

      func(...args);
    };
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
  };
}
