import { createStore, applyMiddleware } from 'redux';
// Allows us to use Local/Session Storage
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

// To use Persist, export our store:
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// add this to pass our 'store' into the persistor, creating a new persisted version of our store and
// "To create our new Provider to wrap our application"
export const persistor = persistStore(store);
// return both the store and persistor:
export default { store, persistor };
