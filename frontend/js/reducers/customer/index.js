import { SET_LOGGED_IN_CUSTOMER } from './actions';

const initState = {
  uid: null,
  username: null,
};

const customerReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN_CUSTOMER:
      return {
        uid: action.uid,
        username: action.username,
      };
    default:
      return state;
  }
};

export default customerReducer;
