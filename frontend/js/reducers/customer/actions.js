export const SET_LOGGED_IN_CUSTOMER = 'SET_LOGGED_IN_CUSTOMER';

export function setLoggedInCustomer(username, uid) {
  return {
    type: SET_LOGGED_IN_CUSTOMER,
    username,
    uid,
  };
}
