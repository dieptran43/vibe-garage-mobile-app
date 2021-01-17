import initialState from '../state';

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'populateUser': {
      return {
        ...state,
        user: action.payload
      };
    }
    default:
      return state;
  }
};
