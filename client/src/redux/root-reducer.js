import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// this 'storage' object from 'redux-persist' gives us the user's Local Storage.
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// The configuration we want Persist to use
const persistConfig = {
  // the point where we start storing data:
  key: 'root',
  // the data we pass in:
  storage,
  // an array containing string names of reducers we want to store in localStorage:
  // 'user' is being handled by Firebase authentication, no need to persist.
  whitelist: ['cart'],
};

// // we change this because we have to wrap it in our new persist reducer call
// export default combineReducers({
//   user: userReducer,
//   cart: cartReducer
// });

// we now export this as an argument in the 'persistReducer' function with our config below
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

// Our modified Root Reducer that now has persist capabilities
export default persistReducer(persistConfig, rootReducer);
