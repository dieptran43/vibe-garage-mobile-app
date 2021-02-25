import initialState from '../state';

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'populateUser': {
      const user = action.payload?.user;
      const token = action.payload?.token;
      const isLoggedIn = action.payload?.isLoggedIn;
      return {
        ...state,
        user,
        token,
        isLoggedIn,
      };
    }
    default:
      return state;
  }
};
