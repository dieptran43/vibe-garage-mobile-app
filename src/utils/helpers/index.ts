export const combineData = (data: any, params: any) => {
  const obj = {} as any;
  for (const property in params) {
    obj[property] = params[property];
  }
  return {...data, ...obj};
};
