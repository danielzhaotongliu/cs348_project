export const SET_LOGGED_IN_CUSTOMER = 'SET_LOGGED_IN_CUSTOMER';

export function setLoggedInCustomer(username) {
  return {
    type: SET_LOGGED_IN_CUSTOMER,
    username,
  };
}
