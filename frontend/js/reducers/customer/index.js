import { SET_LOGGED_IN_CUSTOMER } from './actions';

const initState = {
  username: null,
  uid: null,
};

const customerReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_CUSTOMER:
      return {
        username: action.username,
        uid: action.uid,
      };
    default:
      return state;
  }
};

export default customerReducer;
