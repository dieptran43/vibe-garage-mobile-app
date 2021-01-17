import initialState from '../state';

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'populateUser': {
      const user = action.payload?.user;
      const isLoggedIn = action.payload?.isLoggedIn;
      return {
        ...state,
        user,
        isLoggedIn,
      };
    }
    default:
      return state;
  }
};
