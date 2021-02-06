import { all, call, takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

// run clearCart() action which is sent to the cart reducer to clear the cart.
export function* clearCartOnSignOut() {
  yield put(clearCart());
}

// Listen for action and run clearCartOnSignOut()
export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

// root cart saga that we sent to the root.saga that runs any cart saga we put in this file.
export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
