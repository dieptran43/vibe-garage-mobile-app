import {API_OLD_URL} from '@env';

export const combineData = (data: any, params: any) => {
  const obj = {} as any;
  for (const property in params) {
    obj[property] = params[property];
  }
  return {...data, ...obj};
};

export const getFromOldUrl = (url: any) => {
  return `${API_OLD_URL}/${url}`;
};
