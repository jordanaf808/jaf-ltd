import { createStore, applyMiddleware } from 'redux';
// Allows us to use Local/Session Storage
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
// import thunk from 'redux-thunk'; We no longer need thunk because of Saga
import createSagaMiddleware from 'redux-saga';

import rootSaga from './root-saga';

import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

// To use Persist, export our store:
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// pass in each individual Saga
sagaMiddleware.run(rootSaga);

// add this to pass our 'store' into the persistor, creating a new persisted version of our store and
// "To create our new Provider to wrap our application"
export const persistor = persistStore(store);
// return both the store and persistor:
// export default { store, persistStore };
