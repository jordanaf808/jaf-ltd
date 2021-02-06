import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// 'Provider' is a component class from Redux, once passed 'store', it gives the app access or
// 'context' to the store.
import { Provider } from 'react-redux';
// bring in PersistGate component to wrap around our app
import { PersistGate } from 'redux-persist/integration/react';
// bring in the persisted state to pass in our component
import { store, persistor } from './redux/store';

import './index.css';
import App from './App';

// PersistGate can now receive the store and 'rehydrate' the state with what ever data we stored
// in the persisted state whenever the app refreshes. e.g. we can put items in the cart, and when we refresh
// you'll see at first the cart is empty, then our PersistGate component will 'rehydrate' the state with our
// items we had in the cart before.
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
