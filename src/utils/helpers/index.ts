import {API_OLD_URL} from '@env';

export const combineData = (data: any, params: any) => {
  const obj = {} as any;
  for (const property in params) {
    obj[property] = params[property];
  }
  console.log(data, obj)
  return {...data, ...obj};
};

export const getImage = (url: any) => {
  return `${API_OLD_URL}/${url}`;
};
