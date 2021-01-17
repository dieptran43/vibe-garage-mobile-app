import {userReducer} from './userReducer';

const reduceReducers = (...reducers: any) => (prevState: any, value: any, ...args: any) =>
  reducers.reduce(
    (newState: any, reducer: any) => reducer(newState, value, ...args),
    prevState,
  );

export default reduceReducers(userReducer);
