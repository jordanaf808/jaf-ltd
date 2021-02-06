import { createSelector } from 'reselect';

// there are two types of selectors:
// output selector: uses input selector and createSelector to build itself

// input selector: function that gets whole state and returns a 'slice' of it
// also doesn't use createSelector
const selectCart = (state) => state.cart;

// first argument takes array of input selectors, second argument is a function that
// returns a value from the selectors. because we used 'createSelector()' it is now
// a 'memoized' selector.
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
      accumulatedQuantity + cartItem.quantity * cartItem.price,
    0
  )
);
