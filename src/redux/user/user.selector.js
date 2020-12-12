import { createSelector } from 'reselect';

//
const selectUser = (state) => state.user;
// 2nd input selector
// const selectCart = state => state.cart;

// The first argument can be either an array of input selectors, or you can pass them in as arguments in successive order.
// the last argument gets a function that gets the return of the input selector.
export const selectCurrentUser = createSelector(
  // selectUser,
  // selectCart,
  // (user, cart) => user.currentUser
  [selectUser],
  (user) => user.currentUser
);
